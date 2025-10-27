import express, { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { UserRepository } from '../repositories/implementations/user.repository'
import { UserService } from '../services/user.service'


const router = express.Router()

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

router.post("/register",userController.register)

export default router