import { IAdminRepository } from "../repositories/interface/admin.repository.interface";
import { User } from "../types/user.interface";

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

}