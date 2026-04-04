import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRouters from './routes/productRoutes.js';

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// db connect
connectDB();

// routes 
app.use("/products/api", productRouters);

// server start
const PORT = process.env.PORT || 5002;

app.listen(PORT, ()=>{
    console.log(`Product service running on ${PORT}`);
});