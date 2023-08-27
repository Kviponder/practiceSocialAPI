const {gql} = require('@apollo/client');

export const QUERY_ME = gql`
query GetUserData {
    me {
      _id
      username
      email
      posts {
        _id
        title
        body
        tags
      }
      comments {
        _id
        text
      }
      likes {
        _id
      }
    }
  }
`;
export const QUERY_USERS = gql` 
query GetUsers {
    users {
      _id
      username
      email
    }
  }
`;



