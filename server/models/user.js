import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  id: String,
  posts: {
    type: []
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const User = model("User",  userSchema);

export default User