const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: String
  }
  type Book {
    title: String
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(email: String!, username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(title: String): User
  }
`;

module.exports = typeDefs;
