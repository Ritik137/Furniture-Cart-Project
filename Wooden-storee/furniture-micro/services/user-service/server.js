import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app=express();
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

connectDB();

app.use("/user/api", userRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`User service is running on ${process.env.PORT}`)
});
