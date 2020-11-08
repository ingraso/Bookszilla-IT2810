/**
 * The file to be run on the provided vm, to facilitate reading from and writing to the database
 * Code inspired from:
 * https://medium.com/better-programming/full-stack-react-graphql-mongodb-apollo-building-an-app-cb1eb647c73a
 */

const Express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLResolveInfo,
  GraphQLInt,
  Source,
} = require("graphql");
const { Context } = require("vm");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const PORT = 3001;

const app = Express();
app.use(cors(PORT));

//Connects to the database, authenticating with a user that has read and write privileges
mongoose
  .connect("mongodb://rwUser:bookPenc1l@it2810-20.idi.ntnu.no:27017/searchDB", {
    auth: {
      user: "rwUser",
      password: "bookPenc1l",
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database..."))
  .catch((err: any) => console.error(err));

//Defines a Book interface
interface Book extends Document {
  title: string;
  author: string;
  genres: string[];
  image: string;
}

//Defines a mongoose schema for books
const BookSchema: typeof Schema = new Schema({
  title: String,
  author: String,
  genres: [String],
  image: String,
});

//Uses the BookSchema to make a mongoose model. ts-ignore is used here as
//typescript would complain about BoomSchema having type-arguments
// @ts-ignore
const BookModel: typeof model = mongoose.model<Book>("book", BookSchema);

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 18;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const categories: string[] = [
  "Calendars",
  "Comics & Graphic Novels",
  "Humor & Entertainment",
  "Literature & Fiction",
  "Mystery, Thriller & Suspense",
  "Romance",
  "Science Fiction & Fantasy",
  "Test Preparation",
];

//Defines a graphql type for a book
const BookType = new GraphQLObjectType({
  name: "book",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    genres: { type: GraphQLList(GraphQLString) },
    image: { type: GraphQLString },
  },
});

//Defines a graphql schema for a book, that includes various queries and mutations
const bookSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Queries",
    fields: {
      booksByIds: {
        type: GraphQLList(BookType),
        args: {
          page: { type: GraphQLInt },
          size: { type: GraphQLInt },
          ids: { type: GraphQLList(GraphQLID) },
        },
        resolve: (
          root: typeof Source,
          args: { page: number; size: number; ids: string[] },
          context: typeof Context,
          info: typeof GraphQLResolveInfo
        ) => {
          const { limit, offset } = getPagination(args.page, args.size);
          return BookModel.find({ _id: { $in: args.ids } })
            .skip(offset)
            .limit(limit);
        },
      },
      bookById: {
        type: BookType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve: (
          root: typeof Source,
          args: { [p: string]: any },
          context: typeof Context,
          info: typeof GraphQLResolveInfo
        ) => {
          return BookModel.findById(args.id).exec();
        },
      },
      booksBySearch: {
        type: GraphQLList(BookType),
        args: {
          search: { type: GraphQLString },
          filters: { type: GraphQLList(GraphQLString) },
          page: { type: GraphQLInt },
          size: { type: GraphQLInt },
          sortBy: { type: GraphQLString },
        },
        resolve: (
          root: typeof Source,
          args: {
            search: string;
            filters: string[];
            page: number;
            size: number;
            sortBy: string;
          },
          context: typeof Context,
          info: typeof GraphQLResolveInfo
        ) => {
          const { limit, offset } = getPagination(args.page, args.size);
          const genres = args.filters.length > 0 ? args.filters : categories;
          return BookModel.find({
            $and: [
              { genres: { $in: genres } },
              {
                $or: [
                  {
                    title: { $regex: args.search, $options: "i" },
                  },
                  { author: { $regex: args.search, $options: "i" } },
                ],
              },
            ],
          })
            .skip(offset)
            .limit(limit)
            .sort(args.sortBy);
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "CreateBook",
    fields: {
      books: {
        type: BookType,
        args: {
          title: { type: GraphQLString },
          author: { type: GraphQLString },
          genres: { type: GraphQLList(GraphQLString) },
          image: { type: GraphQLString },
        },
        resolve: (
          root: typeof Source,
          args: { [p: string]: any },
          context: typeof Context,
          info: typeof GraphQLResolveInfo
        ) => {
          let books = new BookModel(args);
          return books.save();
        },
      },
    },
  }),
});

// Users
/**
 * Functionality to register, authenticate, read and update users
 * @var username: the username of the user
 * @var password: the user's encrypted password
 * @var read: the list of books the user has read
 * @var wanted: the list of books the user wants to read
 * @var fav: the list of books the user has marked as favourite
 */
interface User extends Document {
  username: string;
  password: string;
  read: string[];
  wanted: string[];
  fav: string[];
}

const UserSchema: typeof Schema = new Schema({
  username: String,
  password: String,
  read: [String],
  wanted: [String],
  fav: [String],
});

// @ts-ignore
const UserModel: typeof model = mongoose.model<User>("user", UserSchema);

const router = require("express").Router();

const createToken = (user: any) => {
  return jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    process.env.TOKEN_SECRET
  );
};

router.post("/register", async (req: any, res: any) => {
  // Allow only unique usernames
  const isUsernameExist = await UserModel.findOne({
    username: req.body.username,
  });
  if (isUsernameExist) {
    return res.status(400).json({ error: "Username already exists. " });
  }

  // Encrypt(hash) the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new UserModel({
    username: req.body.username,
    password,
    read: [],
    wanted: [],
    fav: [],
  });

  try {
    const savedUser = await user.save();
    const token = createToken(savedUser);
    res.json({ error: null, data: { userId: savedUser._id, token: token } });
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/login", async (req: any, res: any) => {
  // Check if username exists
  const user = await UserModel.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ error: "Username is wrong " });
  }

  // Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Password is wrong" });
  }

  // Create token
  const token = createToken(user);

  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });
});

//Defines a graphql type for a user
const UserType = new GraphQLObjectType({
  name: "user",
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    read: { type: GraphQLList(GraphQLString) },
    wanted: { type: GraphQLList(GraphQLString) },
    fav: { type: GraphQLList(GraphQLString) },
  },
});

//Defines a graphql schema for a user, that includes various graphql queries and mutations
const userSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Queries",
    fields: {
      userInfo: {
        type: UserType,
        args: {
          token: { type: GraphQLString },
        },
        resolve: (
          root: typeof Source,
          args: { token: string },
          context: typeof Context,
          info: typeof GraphQLResolveInfo
        ) => {
          const user = jwt.verify(args.token, process.env.TOKEN_SECRET);
          return UserModel.findById(user.id);
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "UpdateLists",
    fields: {
      updateLists: {
        type: UserType,
        args: {
          readList: { type: GraphQLList(GraphQLString) },
          wantedList: { type: GraphQLList(GraphQLString) },
          favList: { type: GraphQLList(GraphQLString) },
          token: { type: GraphQLString },
        },
        resolve: async function (
          root: typeof Source,
          args: {
            readList: string[];
            wantedList: string[];
            favList: string[];
            token: string;
          },
          context: typeof Context,
          info: typeof GraphQLResolveInfo
        ) {
          const user = jwt.verify(args.token, process.env.TOKEN_SECRET);
          const updatedUser = await UserModel.findByIdAndUpdate(
            user.id,
            {
              $set: {
                read: args.readList,
                wanted: args.wantedList,
                fav: args.favList,
              },
            },
            { useFindAndModify: false, new: true }
          );
          if (!updatedUser) {
            throw new Error("Failed to update list");
          }
          return updatedUser;
        },
      },
    },
  }),
});

//Starts up the express app with the aforementioned graphql schema
app.use(
  "/book",
  graphqlHTTP({
    schema: bookSchema,
    graphiql: true, //This makes manual testing of the different queries and mutations easier
  })
);

app.use(Express.json()); // for body parser
app.use("/auth/", router);

app.use(
  "/user",
  graphqlHTTP({
    schema: userSchema,
    graphiql: true,
  })
);

//Listens for API calls
app.listen(PORT, () => {
  console.log("Server running at", PORT);
});
