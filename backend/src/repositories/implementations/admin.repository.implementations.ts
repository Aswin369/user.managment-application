import { UserModel } from "../../models/user.model";
import { User } from "../../types/user.interface";
import { IAdminRepository } from "../interface/admin.repository.interface";

export class AdminRepository implements IAdminRepository{
    async getUserbyEmail(term: string): Promise<User[] | null> {
       return await UserModel.find({email:{ $regex: term, $options:'i'}}).lean().select('-password')
    }
    async createUser(userData: User): Promise<User> {
        const user = new UserModel(userData)
         await user.save()
         return user
    }
    async findUserByMail(email: string): Promise<User | null> {
        return await UserModel.findOne({email}).lean();
    }
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