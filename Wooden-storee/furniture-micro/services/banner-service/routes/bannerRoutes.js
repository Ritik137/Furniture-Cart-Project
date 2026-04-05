import express from "express";
import multer from "multer";
import { verifyToken, isAdmin } from "../middleware/auth.js";
import { uploadBanner, getBanner } from "../controllers/bannerController.js";

const router = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload banner
router.post("/upload", upload.single("image"), uploadBanner);
// Get banner
router.get("/get", getBanner);

export default router;
