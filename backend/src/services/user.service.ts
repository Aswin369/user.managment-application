import { IUserRepository } from "../repositories/interface/user.repository.interface";
import { User } from "../types/user.interface";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
// import { v2 as cloudinary } from 'cloudinary';
import cloudinary from "../config/cloudinary";

dotenv.config();
export class UserService {
    constructor(private userRepository:  IUserRepository) {}

    registerUser = async (userData: any) =>{
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
        {userId:savedUser._id, email:savedUser.email, role: savedUser.isAdmin ? 'admin' : 'user'},
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
       )

        return {
  user: (savedUser as any).toObject(),
  token
};
    }

    getUser = async(data:any)=>{
      const {userId} = data
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

        if(userData.isBlocked){
          const error:any = new Error("User Blocked by admin")
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
        {userId:userData._id, email:userData.email, role: userData.isAdmin ? 'admin' : 'user'},
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
       )
        
        return {userData, token, role:userData.isAdmin}

    }

async uploadImage(email: string, file: Express.Multer.File) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) return null;
    console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY)
    const uploadedImage = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "user-profile" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(file.buffer);
    });
    console.log("Uploade image", uploadedImage)

    return await this.userRepository.updateProfileImage(email, uploadedImage.secure_url);
  }

  updateUser = async (firstName:string,secondName:string,email:string,userId:string)=>{
    //   console.log(userId,"From serivce dowmn ")
    const updatedUser = await this.userRepository.updateUser(firstName,secondName,email,userId)
    // console.log("From serivce up ", updatedUser)
    if(!updatedUser){
        throw new Error("User unpdate failed")
    }
    return updatedUser
  }

}
