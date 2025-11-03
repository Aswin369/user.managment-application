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

}