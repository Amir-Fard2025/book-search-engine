const { User } = require("../models");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    me: () => {
      return "Hello World";
    },
  },

  Mutation: {
    login: async (parent, args) => {
      const user = await User.findOne({
        $or: [{ username: args.username }, { email: args.email }],
      });
      if (!user) {
        return { message: "Can't find this user" };
      }
      const correctPw = await user.isCorrectPassword(args.password);
      if (!correctPw) {
        return { message: "Wrong password!" };
      }
      // retrieve the token
      const token = signToken(user);

      return { user, token };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      if (!user) {
        return { message: "Something is wrong!" };
      }

      // retrieve the token
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
