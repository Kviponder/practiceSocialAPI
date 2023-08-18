const { Schema } = require("mongoose");

const Likes = new Schema(
    {
        likes: {
            type: Number,
            required: true,
            trim: true,
        },
        dislikes: {
            type: Number,
            required: true,
            trim: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);


module.exports = Likes;
