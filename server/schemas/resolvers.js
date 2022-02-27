const { User } = require("../models");

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

      return user;
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      if (!user) {
        return { message: "Something is wrong!" };
      }

      // retrieve the token
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiQW1pci1GYXJkMjAyNSIsImVtYWlsIjoic2FhZGF0ZmFyZC5hbWlyQHlhaG9vLmNvbSIsIl9pZCI6IjYyMWI5YzIwOTg5OTg1MjQwY2U5ZmZiMSJ9LCJpYXQiOjE2NDU5ODkxMzMsImV4cCI6MTY0NTk5NjMzM30.nAwkuc0Phra5ONsNHN9k11jVFRV4ZAUjGRvm_3A2cro";
      return { token, user };
    },
  },
};

module.exports = resolvers;
