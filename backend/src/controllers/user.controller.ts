import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    constructor(private userService: UserService) {}

    register = async (req: Request, res: Response)=>{
        try{
            console.log("Hello", req.body)
            const {user, token} = await this.userService.registerUser(req.body)
            res.status(201).json({message:"User registered successfully", token,user})
        }catch(err){
            console.error("Error:", err);
            res.status(500).json({ message: "Registration failed" });
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