import { User } from "../../types/user.interface";

export interface IUserRepository {
    findUserByEmail(email:string):Promise<User | null>
    createUser(userData:User):Promise<User>
}