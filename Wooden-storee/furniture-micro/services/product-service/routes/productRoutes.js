import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { verifyToken, isAdmin } from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();

// 📦 Multer setup (for image upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ➕ Add Product (Admin only + image)
router.post("/add", verifyToken, isAdmin, upload.single("image"), addProduct);

// 📖 Get all products (public)
router.get("/getall", getProducts);

// 📖 Get single product
router.get("/get/:id", getProductById);

// ✏️ Update product (Admin only)
router.put("/update/:id", verifyToken, isAdmin, upload.single("image"), updateProduct);

// 🗑️ Delete product (Admin only)
router.delete("/delete/:id", verifyToken, isAdmin, deleteProduct);

export default router;
