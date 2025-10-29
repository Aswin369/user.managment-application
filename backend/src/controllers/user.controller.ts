import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import jwt, { JwtPayload } from 'jsonwebtoken'

export class UserController {
    constructor(private userService: UserService) {}

    register = async (req: Request, res: Response)=>{
        try{
            console.log("Hello", req.body)
            const {user, token} = await this.userService.registerUser(req.body)
            res.status(201).json({message:"User registered successfully", token,user})
        }catch(err:any){
            console.error("Error: in User register", err);
            res.status(409).json({message: err.message || "Something went wrong"})  
            // return res.status(500).json({message: "Internal server error please try again"})
        }
    }

    getUser = async(req:Request, res:Response)=>{
        try {
            const user  = await this.userService.getUser(req.user)
            res.status(200).json(user)
        } catch (error:any) {
            console.error("Fetching user have some error",error)
            return res.status(400).json({message:error.message || "Server error"})
        }
    }

    loginUser = async(req:Request, res: Response)=>{
        try {
            console.log("This is req.boduy", req.body)
            const {userData, token} = await this.userService.loginUser(req.body)
            console.log("userdata",userData)
            res.status(200).json({message:"success", user:userData, token:token})
        } catch (error:any) {
            console.error("Error found in the login user", error);
            const status = error.message === "Password is Incorrect" ? 401 : error.message === "User not exist" ? 404 : 400;
            return res.status(status).json({message: error.message || "Server error",statuscode: status})
        }
    }

    uploadImage = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const file = req.file;

    if (!email || !file) {
      return res.status(400).json({ message: "Missing email or file" });
    }

    const updatedUser = await this.userService.uploadImage(email, file);
    console.log("This updated user",updatedUser)
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "Image uploaded successfully ✅",
      imageUrl: updatedUser.profileImage,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

  updateUser = async(req:Request, res:Response)=>{
    try {
      const {firstName,secondName,email} = req.body
      const authHeader = req.headers['authorization']
      if (!authHeader) {
      return res.status(401).json({ message: 'Token missing' });
      }
      const token = authHeader.split(' ')[1];
      const secret = process.env.JWT_SECRET as string
      const decoded = jwt.verify(token, secret) as JwtPayload & { userId: string };
      const userId = decoded.userId;
      const userUpdatedData = await this.userService.updateUser(firstName,secondName,email,userId)
      console.log("userUpdatedData", userUpdatedData)
      res.status(201).json({message:"Updated success", user:userUpdatedData})
    } catch (error:any) {
      console.error("Updated have some error", error)
      res.status(500).json({message:error.message})
    }
    
    

  }

}
