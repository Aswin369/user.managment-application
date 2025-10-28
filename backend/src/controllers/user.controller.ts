import { Request, Response } from "express";
import { UserService } from "../services/user.service";

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

}
