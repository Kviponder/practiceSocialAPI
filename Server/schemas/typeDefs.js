const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        Posts: [Post]
        comments: [Comment]
    }

    type Post {
        _id: ID
        title: String!
        image: String
        body: String!
        tags: [String]
        comments: [Comment]
        likes: Likes
        user: User
    }

    type Comment {
        _id: ID!
        comment: String!
        user: User
        post: Post
    }

    type Likes {
        _id: ID!
        likes: Int!
        dislikes: Int!
        user: User
        post: Post
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        posts: [Post]
        post(_id: ID!): Post
        comments: [Comment]
        comment(_id: ID!): Comment
        likes: [Likes]
        like(_id: ID!): Likes
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        logout: Auth

        addUser(username: String!, email: String!, password: String!): Auth
        addPost(title: String!, image: String, body: String!, tags: [String]): Post
        addComment(comment: String!): Comment
        addLike(likes: Int!, dislikes: Int!): Likes

        editPost(_id: ID!, title: String!, image: String, body: String!, tags: [String]): Post
        editComment(_id: ID!, comment: String!): Comment
        editLike(_id: ID!, likes: Int!, dislikes: Int!): Likes

        deletePost(_id: ID!): Post
        deleteComment(_id: ID!): Comment
        deleteLike(_id: ID!): Likes
        deleteUser(_id: ID!): User
    }
`;

module.exports = typeDefs;