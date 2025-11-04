import { emit } from "process";
import { IAdminRepository } from "../repositories/interface/admin.repository.interface";
import { User } from "../types/user.interface";
import  bcrypt  from 'bcrypt'

export class AdminService {
    constructor( private adminRepository: IAdminRepository) {}
    getAllUsers = async ()=>{
        return this.adminRepository.getAllUsers()
    }


    updatedExistingUser = async(userData:Partial<User>, userId:string)=>{
        if(!userId){
            throw new Error("User id doesn't exist")
        }
        const updatedUser = await this.adminRepository.updatedExistingUser(userId, userData)
        return updatedUser
    }

    blockAndUnblock = async(userId:string, userData:boolean)=>{
        if(!userId){
            throw new Error("User Id doesn't exist")
        }
        const updatedUser = await this.adminRepository.blockAndUnblock(userId, userData)
        return updatedUser
    }

    createUser = async(user:Partial<User>)=>{
        const {firstName,secondName, email, password} = user

        if(!email){
            throw new Error("Please Provide email")
        }

        const existingUser = await this.adminRepository.findUserByMail(email)
        console.log("i got exixting user",existingUser)
        if(existingUser){
            throw new Error("This mail have already regestered")
        }

        if(!password){
            throw new Error("Please provide password")
        }

        if(!firstName) {
            throw new Error("Please provide Your firstName")
        }
        if(!secondName) {
            throw new Error("Please provide Your secondName")
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newUserData:User = {
            firstName:firstName,
            secondName:secondName,
            email:email,
            password:hashedPassword
        }

        const update = await this.adminRepository.createUser(newUserData)
        return update
    }

    async getUserbyEmail(term:string){
        const users = this.adminRepository.getUserbyEmail(term)
        return users
    }

}

// [1] {
// [1]   firstName: 'asdf',
// [1]   secondName: 'Vdfs',
// [1]   email: 'aswinfsdfvsdf793@gmail.com',
// [1]   password: 'Aswinv@3690',
// [1]   confirmPassword: 'Aswinv@3690'
// [1] }