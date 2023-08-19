const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Comment, Likes } = require("../Models");
const { signToken } = require("../utils/auth");
const { remove } = require("../Models/Likes");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("posts")
          .populate("comments")
          .populate("likes");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      const userData = await User.find().select("-__v -password");
      // .populate("posts")
      // .populate("comments")
      // .populate("likes");
      return userData;
    },
    user: async (parent, { username }) => {
      const params = username ? { username } : {};
      const userData = await User.findOne({ params }).select("-__v -password");
      // .populate("posts")
      // .populate("comments")
      // .populate("likes");
      return userData;
    },
    posts: async () => {
      const postData = await Post.find()
        .select("-__v")
        .populate("comments")
        .populate("likes")
        .populate("user");
      return postData;
    },
    comments: async () => {
      const commentData = await Comment.find()
        .select("-__v")
        .populate("user")
        .populate("post");
      return commentData;
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const { username, email, password } = args;
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user }.catch((err) => {
        console.log(err);
        throw new Error("Something went wrong.");
      });
    },
    addPost: async (parent, args, context) => {
      const { title, image, body, tags } = args;
      const { user } = context;
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      if (!title || !body) {
        throw new AuthenticationError(
          "You need to fill out all required fields"
        );
      }
      try {
        args.user = user._id;
        const post = new Post(args);
        const newPost = await post.save();
        await User.findByIdAndUpdate(
          { _id: user._id },
          { $push: { posts: newPost._id } },
          { new: true }
        );
        return newPost;
      } catch (err) {
        console.log(err);
        throw new Error("Something went wrong.");
      }
    },
    addComment: async (parent, args, context) => {
      const { comment } = args;
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      if (!comment) {
        throw new AuthenticationError(
          "You need to fill out all required fields"
        );
      }
      try {
        args.user = context.user._id;
        const comment = new Comment(args);
        const newComment = await comment.save();
      } catch (err) {
        console.log(err);
        throw new Error("Something went wrong.");
      }
    },
    addLike: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
    },
    editPost: async (parent, args, context) => {
      const { title, image, body, tags } = args;
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      if (!title || !body) {
        throw new AuthenticationError(
          "You need to fill out all required fields"
        );
      }
      const updatedPost = await Post.findByIdAndUpdate(
        { _id: args._id },
        { title, image, body, tags },
        { new: true }
      );
      return updatedPost.catch((err) => {
        console.log(err);
        throw new Error("Something went wrong.");
      });
    },

    editComment: async (parent, args, context) => {
      const { comment } = args;
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      if (!comment) {
        throw new AuthenticationError(
          "You need to fill out all required fields"
        );
      }
      const updatedComment = await Comment.findByIdAndUpdate(
        { _id: args._id },
        { comment },
        { new: true }
      );
      return updatedComment.catch((err) => {
        console.log(err);
        throw new Error("Something went wrong.");
      });
    },

    deleteUser: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        const deletedUser = await User.findByIdAndDelete({
          _id: context.user._id,
        });
        return deletedUser;
      } catch (err) {
        console.log(err);
        throw new Error("Something went wrong.");
      }
    },
    deletePost: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        const deletedPost = await Post.findByIdAndDelete({
          _id: args._id,
        });
        return deletedPost;
      } catch (err) {
        console.log(err);
        throw new Error("Something went wrong.");
      }
    },
    deleteComment: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        const deletedComment = await Comment.findByIdAndDelete({
          _id: args._id,
        });
        return deletedComment;
      } catch (err) {
        console.log(err);
        throw new Error("Something went wrong.");
      }
    },
    deleteLike: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        const deletedLike = await Likes.findByIdAndDelete({
          _id: args._id,
        });
        return deletedLike;
      } catch (err) {
        console.log(err);
        throw new Error("Something went wrong.");
      }
    },
  },
};

module.exports = resolvers;
