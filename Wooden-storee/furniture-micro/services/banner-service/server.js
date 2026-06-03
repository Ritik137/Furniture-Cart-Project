// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

// routes
import bannerRoutes from "./routes/bannerRoutes.js";

// db connection
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// ✅ middleware
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "https://furniture-cart-project-pr7c.vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json());

// ✅ routes
app.use("/api/banner", bannerRoutes);

// ✅ error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ msg: err.message });
  }
  res.status(500).json({ msg: "Server error" });
});

// ✅ DB connect
connectDB();

// ✅ server start
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});