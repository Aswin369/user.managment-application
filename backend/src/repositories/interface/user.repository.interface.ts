import { promises } from "dns";
import { User } from "../../types/user.interface";

export interface IUserRepository {
    findUserByEmail(email:string):Promise<User | null>
    createUser(userData:User):Promise<User>
    getUser(data:string):Promise<User | null>
    loginGetUser(email:string):Promise<User | null>
    updateProfileImage(email:string,image:string):Promise<User | null>
    updateUser(firstName:string,secondName:string,email:string,userId:string):Promise<User | null>
}