import express, { Request, Response } from "express";
import cors from 'cors';
import connectDB from "./config/connect.database";
import userRouter from './routes/user.routes'
import dotenv from 'dotenv'
dotenv.config()
connectDB()

const app = express();
const PORT = process.env.PORT  ||  3000;
console.log(PORT)

app.use(express.json());

app.use(cors({
  origin:'http://localhost:4200',
  methods:['GET', 'POST', 'PUT', 'DELETE'],
  credentials:true
}))

app.use("/user",userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
