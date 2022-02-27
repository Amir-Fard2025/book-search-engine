const resolvers = {
  Query: {
    me: () => {
      return "Hello World";
    },
  },

  Mutation: {
    login: (parent, args) => {
      console.log(args);
      return {
        _id: "621b9c20989985240ce9ffb1",
        username: "Amir-Fard2025",
        email: "saadatfard.amir@yahoo.com",
        password:
          "$2b$10$Y9HNc64CygmZu.vuVXCOTuygHVUMWqYBLD1Y/p.BfAPJ3769cST4i",
      };
    },
  },
};

module.exports = resolvers;
