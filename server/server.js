const express = require("express");
const path = require("path");
const db = require("./config/connection");
// const routes = require("./routes");
const { typeDefs, resolvers } = require("./schemas");
const { ApolloServer } = require("apollo-server-express");
const { authMiddlewareGraphQL } = require("./utils/auth");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// create apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddlewareGraphQL,
});

const serverStart = async () => {
  await server.start();
  server.applyMiddleware({
    app,
  });
};

serverStart();

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
db.once("open", () => {
  try {
    app.listen(PORT, () => {
      console.info(`server is runnig on port:${PORT}`);
      console.info(
        `access graphql at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error(error.message);
  }
});

// const init = async () => {
//   // start the apollo server
//   await server.start();
//   // apply server as a middlewear
//   server.applyMiddleware({ app });
// app.use(routes);

//   db.once("open", () => {
//     app.listen(PORT, () =>
//       console.log(`🌍 Now listening on localhost:${PORT}`)
//     );
//   });
// };

// init();
