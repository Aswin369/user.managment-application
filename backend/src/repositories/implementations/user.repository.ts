import { UserModel } from "../../models/user.model";
import { User } from "../../types/user.interface";
import { IUserRepository } from "../interface/user.repository.interface";

export class UserRepository implements IUserRepository{

    async createUser(userData: User): Promise<User> {
        const user = new UserModel(userData)
        return await user.save()
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({email})
    }
    async getUser(data: string): Promise<User | null> {
        return await UserModel.findOne({_id:data}).select('-password');
    }

    async loginGetUser(email:string):Promise<User | null> {
        return await UserModel.findOne({email:email})
    }
    async updateProfileImage(email: string, imageUrl: string) {
    return await UserModel.findOneAndUpdate(
      { email },
      { profileImage: imageUrl },
      { new: true }
    );
  }

  async updateUser(firstName: string, secondName: string, email: string, userId: string): Promise<User | null> {
        return await UserModel.findByIdAndUpdate(userId,{firstName:firstName, secondName:secondName, email:email},{new:true})
        // console.log("this repo", vale)
        // return vale
    }
}