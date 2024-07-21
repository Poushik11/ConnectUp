import express from "express";
import {
  registerUser,
  loginUser,
  addFriend,
  getFriends,
  searchUsers,
  getMe,
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/addFriend", protect, addFriend);
router.get("/friends", protect, getFriends);
router.get("/searchUsers", searchUsers);
router.get("/me", protect, getMe);

export default router;
