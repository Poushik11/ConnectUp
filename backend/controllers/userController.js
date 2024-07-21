import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Friend from "../models/friendModel.js";
import dotenv from "dotenv";

dotenv.config();
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new error("Invalid user data");
  }
});
// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const addFriend = asyncHandler(async (req, res) => {
  console.log(req);
  const { friendId } = req.body;
  const userId = req.user.id; // assuming userId is attached to the request by an authentication middleware

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    console.log(user, friend);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }

    let userFriends = await Friend.findOne({ userId });
    if (!userFriends) {
      userFriends = new Friend({ userId, friends: [] });
    }

    if (userFriends.friends.includes(friendId)) {
      return res.status(400).json({ message: "Friend already added" });
    }

    userFriends.friends.push(friendId);
    await userFriends.save();

    res.status(200).json({
      message: "Friend added successfully",
      friends: userFriends.friends,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
const getFriends = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  try {
    const userFriends = await Friend.findOne({ userId }).populate(
      "friends",
      "name email"
    );

    if (!userFriends) {
      return res.status(404).json({ message: "No friends found" });
    }

    res.status(200).json(userFriends.friends);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

const searchUsers = async (req, res) => {
  const { query } = req.query;

  try {
    const users = await User.find({
      email: { $regex: query, $options: "i" },
    }).select("email username");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.status(200).json({
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    });
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { registerUser, loginUser, addFriend, getFriends, searchUsers, getMe };
