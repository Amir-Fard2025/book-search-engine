const { gql } = require("@apollo/client");

export const GET_ME = gql`
  query {
    me {
      _id
      username
      savedBooks {
        title
        bookId
        authors
        description
        image
      }
    }
  }
`;
