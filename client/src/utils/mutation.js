const { gql } = require("@apollo/client");

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;
const ADDUSER = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    adduser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;
const SAVEBOOK = gql`
  mutation ($book: BookData!) {
    saveBook(book: $book) {
      username
    }
  }
`;

export { LOGIN, ADDUSER, SAVEBOOK };
