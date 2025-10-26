import express, { Request, Response } from "express";
import cors from 'cors';
import connectDB from "./config/connect.database";

connectDB()

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({
  origin:'http://localhost:4200',
  methods:['GET', 'POST', 'PUT', 'DELETE'],
  credentials:true
}))



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
