import { IAdminRepository } from "../repositories/interface/admin.repository.interface";

export class AdminService {
    constructor( private adminRepository: IAdminRepository) {}
    getAllUsers = async ()=>{
        return this.adminRepository.getAllUsers()
    }
}