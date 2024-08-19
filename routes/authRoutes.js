import express from 'express'
import {
  register,
  verifyAccount,
  login,
  user
} from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const authRoutes = express.Router()

authRoutes.post('/register', register)
authRoutes.get('/verify/:token', verifyAccount)
authRoutes.post('/login', login)


//Area Provada - Requiere un JWT
authRoutes.get('/user',authMiddleware,user)

export default authRoutes
