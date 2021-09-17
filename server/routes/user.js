import express from "express";
import {
  getUser,
  login,
  register,
  uploadUserPhoto,
  updateUserData,
  getListOfUsersByName
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);


router.get("/search", auth, getListOfUsersByName);
router.get("/:id", auth, getUser);


router.patch("/upload/:id", auth, uploadUserPhoto);

router.patch("/update/:id", auth, updateUserData);


export default router;
