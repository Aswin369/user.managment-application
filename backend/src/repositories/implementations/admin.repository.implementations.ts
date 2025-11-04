import { UserModel } from "../../models/user.model";
import { User } from "../../types/user.interface";
import { IAdminRepository } from "../interface/admin.repository.interface";

export class AdminRepository implements IAdminRepository{
    async blockAndUnblock(userId: string, userData: boolean): Promise<User | null> {
        return await UserModel.findByIdAndUpdate(userId,{$set:{isBlocked:userData}},{new:true}).lean().select("-password")
    }
    async updatedExistingUser(userId:string,userData:Partial<User>): Promise<User | null> {
        return await UserModel.findByIdAndUpdate(userId,{$set:userData},{new:true}).lean().select("-password")
    }
    async getAllUsers(): Promise<User[] | null> {
        return await UserModel.find({}).lean().select('-password')
    }
        
}