// routes/userRoutes.js
import express from "express";
import {
  getMyProfile,
  updateProfile,
  getAllUsers,
  deleteUser
} from "../controllers/userController.js";

import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// user
router.get("/me", verifyToken, getMyProfile);
router.put("/me", verifyToken, updateProfile);

// admin
router.get("/", verifyToken, isAdmin, getAllUsers);
router.delete("/:id", verifyToken, isAdmin, deleteUser);

export default router;