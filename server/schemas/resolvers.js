const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Please login first!");
      // return "Hello World";
    },
  },
  Mutation: {
    // login
    login: async (parent, args) => {
      const user = await User.findOne({
        $or: [{ email: args.email }],
      });
      if (!user) {
        return { message: "Can't find this user" };
      }
      const correctPw = await user.isCorrectPassword(args.password);
      if (!correctPw) {
        return { message: "Wrong password!" };
      }
      // retrieve the token
      const token = signToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });

      return { user, token };
    },
    //signUp
    addUser: async (parent, args) => {
      const user = await User.create(args);
      if (!user) {
        return { message: "Something is wrong!" };
      }

      // retrieve the token
      const token = signToken(user);
      return { token, user };
    },
    // saveBook
    saveBook: async () => {
      console.log("Hello World");
    },
  },
};
module.exports = resolvers;
