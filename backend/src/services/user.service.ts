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
        console.log(process.env.JWT_SECRET,"creating time env")
       const token = jwt.sign(
        {userId:savedUser._id, email:savedUser.email},
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
       )
       console.log("creating User token",token)
        return {user: savedUser, token}
    }

    getUser = async(data:any)=>{
        const {userId} = data
        console.log("thsi is user id ",userId)
        const userData = await this.userRepository.getUser(userId)
        console.log("get data from frontend", userData)
        if(!userData){
            throw new Error("User not Exist")
        }
        return userData
    }

    loginUser = async(data:any) =>{
        const {email, password} = data

        const userData = await this.userRepository.loginGetUser(email)
        if(!userData){
            const error:any = new Error("User does not Exist")
            error.statuscode = 404
            throw error
        }

        const passwordIsmatch = await bcrypt.compare(password, userData.password)
        if(!passwordIsmatch){
            const error: any = new Error("Password is Incorrect")
            error.statuscode = 401
            throw error
        }
        const token = jwt.sign(
        {userId:userData._id, email:userData.email},
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
       )
        
        return {userData, token}

    }

}
