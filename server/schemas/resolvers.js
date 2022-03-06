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
    // saveBook
    saveBook: async (parent, { input }, context) => {
      console.log(context.user._id);
      const { _id } = context.user;
      try {
        return await User.findOneAndUpdate(
          { _id },
          { $push: { savedBooks: input } },
          { new: true, runValidators: true }
        ).populate("savedBooks");
      } catch (error) {
        console.error(error.message);
      }

      // try {
      //   const updatedUser = await User.findOneAndUpdate(
      //     { _id: user._id },
      //     { $addToSet: { savedBooks: body } },
      //     { new: true, runValidators: true }
      //   );
      //   return res.json(updatedUser);
      // } catch (err) {
      //   console.log(err);
      //   return res.status(400).json(err);
      // }
      return { message: " Implementation is in progress" };
    },
  },
};
module.exports = resolvers;
