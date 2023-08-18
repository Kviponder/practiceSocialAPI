const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
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

const Comment = model("Comment", CommentSchema);
module.exports = Comment;
