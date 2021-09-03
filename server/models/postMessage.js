import mongoose from "mongoose";

const { Schema, model } = mongoose;

const postSchema = Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  name: String,
  creatorId: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  tags: [String],
  likeCount: {
    type: Number,
    default: 0,
  },
  selectedFile:  {
    type: String,
    required: true
  },
});

const PostMessage = model("PostMessage", postSchema);

export default PostMessage;
