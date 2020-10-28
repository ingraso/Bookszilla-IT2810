// Inspired from:
// https://medium.com/@tharun267/authentication-and-authorization-using-node-js-717d94ecc84d

const { AuthenticationError } = require("apollo-server");
/*
const userResolvers = {
  Query: {
    me: (parent: any, args: any, context: any, info: any) => {
      console.log(context.user);
      if (context.loggedIn) {
        return context.user;
      } else {
        throw new AuthenticationError("Please log in again.");
      }
    },
  },
  Mutation: {
    register: async (parent: any, args: any, context: any, info: any) => {
      const newUser = {
        username: args.username,
        password: await encryptPassword(args.password),
      };
      const user = await db
        .getCollection("user")
        .findOne({ username: args.username });
      if (user) {
        throw new AuthenticationError("User already exists!");
      }
      try {
        const regUser = (await db.getCollection("user").insertOne(newUser))
          .ops[0];
        const token = getToken(regUser);
        return { ...regUser, token };
      } catch (err) {
        throw err;
      }
    },
    login: async (parent: any, args: any, context: any, info: any) => {
      const user = await db
        .getCollection("user")
        .findOne({ username: args.username });
      const isMatch = await comparePassword(args.password, user.password);
      if (isMatch) {
        const token = getToken(user);
        return { ...user, token };
      } else {
        throw new AuthenticationError("Wrong password!");
      }
    },
  },
};

module.exports = {
  userResolvers,
};
*/
export {};
