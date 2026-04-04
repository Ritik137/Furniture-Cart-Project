// controllers/userController.js
import User from "../models/User.js";

// 👤 Get my profile
export const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

// ✏️ Update profile
export const updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  );

  res.json(user);
};

// 👑 Admin: Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// 👑 Admin: Delete user
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "User deleted" });
};