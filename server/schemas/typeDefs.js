const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
    bookCount: String
  }
  type Book {
    bookId: ID
    authors: [String]
    title: String
    description: String
    image: String
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
  }

  input BookData {
    bookId: ID
    authors: [String]
    title: String
    description: String
    image: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    adduser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookData!): User
  }
`;

module.exports = typeDefs;
