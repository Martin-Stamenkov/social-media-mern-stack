import express from "express";
import {
  getUser,
  login,
  register,
  uploadUserPhoto,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/:id", auth, getUser);

router.patch("/upload/:id", auth, uploadUserPhoto);

export default router;
