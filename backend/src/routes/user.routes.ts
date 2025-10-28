import express, { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { UserRepository } from '../repositories/implementations/user.repository'
import { UserService } from '../services/user.service'
import authenticateToken from '../middlewares/authenticate.middlewares'


const router = express.Router()

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

router.post("/register",userController.register)
router.post('/login', userController.loginUser)
router.get('/me', authenticateToken, userController.getUser)
export default router