const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: String
  }

  type Mutation {
    login(email: String!, password: String): User
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
