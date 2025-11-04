import { User } from "../../types/user.interface";

export interface IAdminRepository {
    getAllUsers():Promise<User[] | null>
    updatedExistingUser(userId:string,userData:Partial<User>):Promise<User | null>
    blockAndUnblock(userId:string, userData:boolean):Promise<User | null>
}   