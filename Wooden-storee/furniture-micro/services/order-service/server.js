import express from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js"
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/orders/api", orderRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Order Service running on ${process.env.PORT}`)
});