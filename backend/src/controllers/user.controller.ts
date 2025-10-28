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
                res.status(409).json({
                message: err.message || "Something went wrong",
            });  
            // return res.status(500).json({message: "Internal server error please try again"})
        }
    }

}

// [1] Hello {
// [1]   firstName: 'Aswin',
// [1]   secondName: 'Vasd',
// [1]   email: 'aswinv793@gmail.com',
// [1]   password: 'Aswinv@3690',
// [1]   confirmPassword: 'Aswinv@3690'
// [1] }