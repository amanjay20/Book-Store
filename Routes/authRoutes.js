import express from 'express'
import { loginController, registerController } from '../Controller/authController.js'


const router = express.Router()
//REGISTER
router.post('/register' ,  registerController)

//LOGIN
router.post('/login' , loginController )

export default router