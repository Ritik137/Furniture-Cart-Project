// routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// user
router.post("/", verifyToken, createOrder);
router.get("/my", verifyToken, getMyOrders);

// admin
router.get("/", verifyToken, isAdmin, getAllOrders);
router.put("/:id", verifyToken, isAdmin, updateOrderStatus);

export default router;