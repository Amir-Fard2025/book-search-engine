const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
  }
  type Auth {
    token: ID
  }
  input LoginInput {
    username: String
    email: String
    password: String
  }
  type Mutation {
    login(input: LoginInput): Auth
  }
`;

module.exports = typeDefs;
