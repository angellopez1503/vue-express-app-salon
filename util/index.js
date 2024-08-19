import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const isNotValidObjectId = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID no es valido')
    return res.status(400).json({
      msg: error.message,
    })
  }
}

const isNotExistsItem = (item, message, res) => {
  if (!item) {
    const error = new Error(message)
    return res.status(404).json({
      msg: error.message,
    })
  }
}

const errorMessage = (res, msg,status=400) => {
  const error = new Error(msg)
  return res.status(status).json({ msg: error.message })
}

const isEmptyObjectValues = (req, res) => {
  if (Object.values(req.body).includes('')) {
    const error = new Error('Todos los campos son obligatorios')
    return res.status(400).json({
      msg: error.message,
    })
  }
}

const uniqueId = () =>
  Date.now().toString(32) + Math.random().toString(32).substring(2)

const generateJWT = (id) => {
  const token = jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn:'30d'
  })

  return token
}

export {
  isNotValidObjectId,
  isNotExistsItem,
  uniqueId,
  isEmptyObjectValues,
  errorMessage,
  generateJWT

}
