import { User } from "../../types/user.interface";

export interface IAdminRepository {
    getAllUsers():Promise<User[] | null>
}