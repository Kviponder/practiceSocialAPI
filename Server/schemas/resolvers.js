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
            const userData = await User.find()
                .select("-__v -password")
                .populate("posts")
                .populate("comments")
                .populate("likes");
            return userData;
        },
        user: async (parent, { username }) => {
            const params = username ? { username } : {};
            const userData = await User.findOne({ params })
                .select("-__v -password")
                .populate("posts")
                .populate("comments")
                .populate("likes");
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
        }
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
            if (!username || !email || !password) {
                throw new AuthenticationError("You need to fill out all fields");
            } 
            try {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                  throw new Error("User with this email already exists.");
                }
                const user = new User({ username, email, password });
                const newUser = await user.save();
                const token = signToken(newUser);
                return { token, user: newUser };

            } catch (err) {
                console.log(err);z
                throw new Error("Something went wrong.");
            }

        },
        addPost: async (parent, args, context) => {
            const { title, image, body, tags } = args;
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            if (!title || !body) {
                throw new AuthenticationError("You need to fill out all required fields");
            }
            try {
                args.user = context.user._id;
                const post = new Post(args);
                const newPost = await post.save();
} catch (err) {
                console.log(err);
                throw new Error("Something went wrong.");
            }
        },
        addComment: async (parent, args, context) => {
            const { comment } = args;
        },
        addLike: async (parent, args, context) => {},
        editUser: async (parent, args, context) => {},
        editPost: async (parent, args, context) => {},
        editComment: async (parent, args, context) => {},

        removeUser: async (parent, args, context) => {},
        removePost: async (parent, args, context) => {},
        removeComment: async (parent, args, context) => {},
        removeLike: async (parent, args, context) => {},

       
    },


    }



module.exports = resolvers;

