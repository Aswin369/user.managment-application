import { IUserRepository } from "../repositories/interface/user.repository.interface";
import { User } from "../types/user.interface";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config();
export class UserService {
    constructor(private userRepository:  IUserRepository) {}

    registerUser = async (userData: User) =>{
        const existingUser = await this.userRepository.findUserByEmail(userData.email);
        if(existingUser) {
            console.log('Emial is exist', existingUser)
            throw new Error("User already exists")
        } 
        const {firstName, secondName, email, password} = userData;
        const hashedPassword = await bcrypt.hash(password,10)
        const newUserData:User = {
            firstName:userData.firstName,
            secondName:userData.secondName,
            email:userData.email,
            password:hashedPassword
        }
        const savedUser = await this.userRepository.createUser(newUserData)
        console.log(savedUser,"sadfsdf")
       const token = jwt.sign(
        {userId:savedUser._id, email:savedUser.email},
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
       )
        return {user: savedUser, token}
    }
}
