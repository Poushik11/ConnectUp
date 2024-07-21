import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Friend = mongoose.model("Friend", FriendSchema);
export default Friend;
