import express from "express";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  getPostDetails,
  getUserPhotos
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPostDetails);

router.post("/", auth, createPost);

router.patch("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

router.get("/photos/:id", getUserPhotos);

export default router;
