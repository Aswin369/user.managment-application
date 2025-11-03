import express from 'express'
import { AdminRepository } from '../repositories/implementations/admin.repository.implementations'
import { AdminService } from '../services/admin.services'
import { AdminController } from '../controllers/admin.controller'




const router = express.Router()

const adminRepository = new AdminRepository()
const adminService = new AdminService(adminRepository)
const adminController = new AdminController(adminService)

router.get('/Userslist',adminController.getALlUser)


export default router
