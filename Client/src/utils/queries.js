const { gql } = require("@apollo/client");

export const QUERY_ME = gql`
  query Me {
    me {
      username
      email
      _id
    }
  }
`;
export const QUERY_USERS = gql`
  query GetUsers {
    users {
      username
      email
      _id
    }
  }
`;
export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      username
      email
      _id
    }
  }
`;

export const QUERY_POSTS = gql`
  query Posts {
    posts {
      user {
        username
        _id
      }
      title
      tags
      likes {
        likes
        dislikes
        _id
      }
      image
      comments {
        comment
        _id
        user {
          _id
        }
      }
      body
      _id
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query Post($id: ID!) {
    post(_id: $id) {
      user {
        username
        _id
      }
      title
      tags
      likes {
        likes
        dislikes
        _id
      }
      image
      comments {
        user {
          username
          _id
        }
      }
      body
      _id
    }
  }
`;

