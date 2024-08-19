import User from '../models/User.js'
import { errorMessage } from '../util/index.js'
import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
  console.log(req)
   if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      console.log("1")
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decoded)
      req.user = await User.findById(decoded.id).select(
        '-password -verified -token -__v',
      )
      console.log("2")
      next()
    } catch (error) {
      errorMessage(res, 'Token no valido', 401)
      return
    }
  } else {
    console.log("else")
    errorMessage(res, 'Token no valido o inexistente', 401)
    return
  }

   
}

export default authMiddleware
