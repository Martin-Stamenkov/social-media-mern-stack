import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import User from "../models/user.js";

const { Types } = mongoose;

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }
    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isCorrectPassword) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "secretUser",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const register = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword, imageUrl } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(404).json({ message: "User already exist." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      imageUrl: imageUrl,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      "secretUser",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    res.status(200).json(user);
    return;
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const uploadUserPhoto = async (req, res) => {
  const { id } = req.params;
  const imageUrl = req.body.data.imageUrl;

  try {
    const uploadedPhoto = await User.findByIdAndUpdate(
      id,
      { imageUrl },
      { new: true }
    );
    if (!Types.ObjectId.isValid(id)) {
      return res.status(404).send("No user with that id");
    }
    res.status(200).json(uploadedPhoto);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateUserData = async (req, res) => {
  const { id } = req.params;
  const data = req.body.data;

  try {
    const updateData = await User.findByIdAndUpdate(
      id,
       data ,
      { new: true }
    );
    if (!Types.ObjectId.isValid(id)) {
      return res.status(404).send("No user with that id");
    }
    res.status(200).json(updateData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
