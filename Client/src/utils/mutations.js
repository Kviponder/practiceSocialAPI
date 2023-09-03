const { gql } = require("@apollo/client");

export const MUTATION_ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        username
        email
        _id
      }
      token
    }
  }
`;

export const MUTATION_LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        username
        email
        _id
      }
      token
    }
  }
`;

export const MUTATION_LOGOUT = gql`
  mutation Logout {
    logout {
      user {
        username
        email
        _id
      }
      token
    }
  }
`;


