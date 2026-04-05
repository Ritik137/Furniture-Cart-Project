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

// 📦 Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ➕ Add Product
router.post("/add", verifyToken, isAdmin, upload.single("image"), addProduct);

// 📖 Get all products (with optional category filter)
router.get("/getall", getProducts);

// 📖 Get single product
router.get("/get/:id", getProductById);

// ✏️ Update product
router.put("/update/:id", verifyToken, isAdmin, upload.single("image"), updateProduct);

// 🗑️ Delete product
router.delete("/delete/:id", verifyToken, isAdmin, deleteProduct);

export default router;