import { Request, Response } from "express";
import { AdminService } from "../services/admin.services";

export class AdminController {
    constructor( private adminService: AdminService) {}

    getALlUser = async (req:Request, res:Response)=>{
        try {
            console.log("This is backend response",req.body)
            const data = await this.adminService.getAllUsers()
            res.status(200).json({success:true,message:"Fetched all users", users:data})
        } catch (error:any) {
            console.error("Something went worng in getAllUser", error);
            res.status(500).json({success:false, message:"Failed to fetch users", error:error.message})
        }
    }

    updatedExistingUser = async(req:Request, res:Response) => {
        try{
            const {userData,userId} = req.body
            console.log("THisasdflk", req.body)
            const updatedUser = await this.adminService.updatedExistingUser(userData,userId)
            res.status(200).json({ssuccess:true,message:"Updated users", updatedUser})
        }catch(error:any){
            console.error("Something Went wrong while updatedExistingUser",error)
            res.status(500).json({success:false, message:"Failed to fetch users", error:error.message})
        }
    }

    blockAndUnblock = async (req:Request, res:Response)=>{
        try {
            const {userId, userData} = req.body
            const updatedUser = await this.adminService.blockAndUnblock(userId,userData)
            res.status(200).json({success:true,message:"Updated users", updatedUser})
            console.log(userId, userData)
        } catch (error:any) {
            console.error("SomethingWent wrong blockAndUnblock", error)
            res.status(500).json({success:false, message:"Failed to fetch users", error:error.message})
        }
    }

    createUser = async (req:Request,res:Response)=>{
        try {
            const user = req.body
            const updatedUser = await this.adminService.createUser(user)
            res.status(200).json({success:true,message:"Updated users", updatedUser})
        } catch (error:any) {
            console.log("Something went wrong when create user by admin",error)
            res.status(500).json({success:false, message:"Failed to fetch users", error:error.message})
        }
    }

    getUserbyEmail = async (req:Request, res:Response)=>{
        try {
            const term = req.query.query?.toString() || ''
            const user = await this.adminService.getUserbyEmail(term)
            res.status(200).json({success:true,message:"Fetched all searched  users", users:user})
        } catch (error:any) {
            console.error("SOmething went wrong from getUserbyEmail", error)
            res.status(500).json({success:false, message:"Failed to fetch users for search", error:error.message})
        }
    }
}

