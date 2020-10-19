const graphQL = require('graphql');
//Sample data
const Books = [
  {
    "id": 213456789,
    "title": "Test book",
    "author": "Test Author",
    "genres": ["Genre1", "Genre2"],
    "image": "image.url",
  }
]

const BookType = new graphQL.GraphQLObjectType({
  name: 'book',
  fields: function () {
    return {
      id: {
        type: graphQL.GraphQLID
      },
      title: {
        type: graphQL.GraphQLString
      },
      author: {
        type: graphQL.GraphQLString
      },
      genres: {
        type: [graphQL.GraphQLString]
      },
      image: {
        type: graphQL.GraphQLString
      },
    }
  }
});

const queryType = new graphQL.GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      books: {
        type: new graphQL.GraphQLList(BookType),
        resolve: function () {
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve(Books)
            }, 4000)
          });
        }
      }
    }
  }
});

const MutationAddBook = {
  type: BookType,
  description: "Add a book",
  args: {
    title: {
      name: 'Book title',
      type: new graphQL.GraphQLNonNull(graphQL.GraphQLString)
    },
    author: {
      name: 'Author name',
      type: graphQL.GraphQLString
    },
    genres: {
      name: 'Array of genres',
      type: [graphQL.GraphQLString]
    },
    image: {
      name: '',
      type: graphQL.GraphQLString
    },
  },

}

module.exports = new graphQL.GraphQLSchema({
  query: queryType,
});