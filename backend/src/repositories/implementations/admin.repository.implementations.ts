import { UserModel } from "../../models/user.model";
import { User } from "../../types/user.interface";
import { IAdminRepository } from "../interface/admin.repository.interface";

export class AdminRepository implements IAdminRepository{
    async getAllUsers(): Promise<User[] | null> {
        return await UserModel.find({}).lean().select('-password')
    }
        
}