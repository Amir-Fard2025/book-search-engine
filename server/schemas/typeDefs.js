const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: String
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: String
  }

  type Mutation {
    login(email: String!, password: String): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
