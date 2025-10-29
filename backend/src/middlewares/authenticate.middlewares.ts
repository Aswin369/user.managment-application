import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

 function authenticateToken(req: Request, res: Response, next: NextFunction) {
    // console.log('asldkfj', req)
  const authHeader = req.headers["authorization"];
  // console.log("THis is auth header", authHeader)
  const token = authHeader && authHeader.split(" ")[1];
  // console.log("splitted token", token)
  if (!token){
      return res.status(401).json({ message: "No token provided authorization" });
  }
  const secret = process.env.JWT_SECRET as string;
  console.log("This is env",process.env.JWT_SECRET)
  try {
      if (!secret) {
          // console.log("errrrrrrrrrrrrrrr")
          throw new Error("JWT_SECRET is not defined in environment variables");
        }
        // console.log("dsfsdf")
        // console.log("THis ise secret",secret)
    const decoded = jwt.verify(token, secret);
    // console.log("dsfsdf")
    // console.log("Decode item ", decoded);
    req.user  = decoded
    // console.log("req.user", req.user)
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(403).json({message:"Invalid or expired token"})
  }
}

export default authenticateToken
