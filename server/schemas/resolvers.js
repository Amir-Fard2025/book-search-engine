const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Please login first!");
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
        _id: user.id,
        username: user.username,
        email: user.email,
      });
      return { user, token };
    },
    //signUp
    adduser: async (parent, args) => {
      console.log(args);
      const user = await User.create({
        username: args.username,
        email: args.email,
        password: args.password,
      });
      if (!user) {
        console.log("Error in adding a user");
        return { message: "Something is wrong!" };
      }

      // retrieve the token
      const token = signToken({
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
      });
      return { token, user };
    },

    saveBook: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      } else {
        try {
          if (!args.book.description) {
            args.book.description = "No description";
          }
          const updateUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: { ...args.book } } },
            { new: true, runValidators: true }
          );
          return updateUser;
        } catch (error) {
          return { message: "Something went wrong while adding a book" };
        }
      }
      // saveBook: async (parent, args, context) => {
      //   console.log(context.user._id);
      //   const { _id } = context.user;
      //   try {
      //     return await User.findOneAndUpdate(
      //       { _id },
      //       { $push: { savedBooks: args.book } },
      //       { new: true, runValidators: true }
      //     ).populate("savedBooks");
      //   } catch (error) {
      //     console.error(error.message);
      //   }
      // },
      // },
    },
  },
};

module.exports = resolvers;
