/**
 * The file to be run on the provided vm, to facilitate reading and writing to the database
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
const mongoosePaginate = require("mongoose-paginate-v2");

const app = Express();
app.use(cors(3002));


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
      books: {
        type: GraphQLList(BookType),
        args: {
          page: {type: GraphQLInt},
          size: {type: GraphQLInt},
        },
        resolve: (
          root: typeof Source,
          args: { page: number, size: number },
          context: typeof Context,
          info: typeof GraphQLResolveInfo
        ) => {
          const {limit, offset} = getPagination(args.page, args.size);
          return BookModel.find().skip(offset).limit(limit);
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
      booksByTitle: {
        type: BookType,
        args: {
          title: { type: GraphQLString },
          page: {type: GraphQLInt},
          size: {type: GraphQLInt},
        },
        resolve: (
          root: typeof Source,
          args: { [p: string]: any },
          context: typeof Context,
          info: typeof GraphQLResolveInfo
        ) => {
          const {limit, offset} = getPagination(args.page, args.size);
          return BookModel.find({ title: {"$regex": args.title , "$options": "i" } }).skip(offset).limit(limit);
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

//Starts up the express app with the aforementioned graphql schema
app.use(
  "/book",
  graphqlHTTP({
    schema: bookSchema,
    graphiql: true, //This makes manual testing of the different queries and mutations easier
  })
);

//Listens for API calls
app.listen(3002, () => {
  console.log("Server running at 3002");
});
