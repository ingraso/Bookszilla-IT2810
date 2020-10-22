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
  Source,
} = require("graphql");
const { Context } = require("vm");

const app = Express();
const cors = require("cors");

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

interface Book extends Document {
  title: string;
  author: string;
  genres: string[];
  image: string;
}

const BookSchema: typeof Schema = new Schema({
  title: String,
  author: String,
  genres: [String],
  image: String,
});

// @ts-ignore
const BookModel: typeof model = mongoose.model<Book>("book", BookSchema);

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

const bookSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Queries",
    fields: {
      books: {
        type: GraphQLList(BookType),
        resolve: (
          root: typeof Source,
          args: any,
          context: typeof Context,
          info: typeof GraphQLResolveInfo
        ) => {
          return BookModel.find().exec();
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
      bookByTitle: {
        type: BookType,
        args: {
          title: { type: GraphQLString },
        },
        resolve: (
          root: typeof Source,
          args: { [p: string]: any },
          context: typeof Context,
          info: typeof GraphQLResolveInfo
        ) => {
          return BookModel.find({ title: args.title }).exec();
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

app.use(
  "/book",
  graphqlHTTP({
    schema: bookSchema,
    graphiql: true,
  })
);

app.listen(3001, () => {
  console.log("Server running at 3001");
});
