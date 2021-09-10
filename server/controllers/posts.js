import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

const { Types } = mongoose;

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    return res.status(200).json(postMessages);
  } catch (error) {
    if (error) {
      return res.status(404).json({ message: error.message });
    }
  }
};

export const getPostDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const postMessages = await PostMessage.findById(id);
    res.send(postMessages);

    return res.status(200).json(postMessages);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creatorId:  req.userId ? req.userId : req.body.creatorId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

export const getUserPostsPhotos = async (req, res) => {
  const { id } = req.params;

  try {
    const postMessages = await PostMessage.find();
    const loggedUserPosts = postMessages.filter((post) => post.creatorId === id)
    const userPostsPhotos = loggedUserPosts.map((photo) => photo.selectedFile)

    return res.status(200).json(userPostsPhotos);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};