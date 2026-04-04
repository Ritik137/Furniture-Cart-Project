import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();
app.use(cors());

app.use("/upload/api", uploadRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Upload Service running on ${process.env.PORT}`)
);