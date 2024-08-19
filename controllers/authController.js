import User from '../models/User.js'
import { errorMessage, isEmptyObjectValues } from '../util/index.js'
import { sendEmailVerification } from '../emails/authEmailService.js'
import { generateJWT } from '../util/index.js'

const register = async (req, res) => {
  if (Object.values(req.body).includes('')) {
    errorMessage(res,'Todos los campos son obligatorios')
    return
  }

  const { email, password, name } = req.body
  //Evitar registros duplicados
  const userExists = await User.findOne({ email })
  if (userExists) {
    errorMessage(res, 'Ya existe un Usuario registrado con ese Email')
    return
  }
  //Validar la extension del password
  const MIN_PASSWORD_LENGTH = 8
  if (password.trim().length < MIN_PASSWORD_LENGTH) {
    errorMessage(res,`El password debe contener ${MIN_PASSWORD_LENGTH} caracteres`)
    return
  }

  try {
    const user = new User(req.body)
    const result = await user.save()
    const { name, email, token } = result
    sendEmailVerification({ name, email, token })
    res.json({
      msg: 'El usuario se creo correctamente, revisa tu email',
    })
  } catch (error) {
    console.log(error)
  }
}

const verifyAccount = async (req, res) => {
  const { token } = req.params

  const user = await User.findOne({ token })
  if (!user) {
    errorMessage(res, 'Hubo un error, token no valido', 401)
    return
  }

  //Si el usuario  es valido, confirmar la cuenta
  try {
    user.verified = true
    user.token = ''
    await user.save()
    res.json({ msg: 'Usuario confirmado correctamente' })
  } catch (error) {
    console.log(error)
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  //Revisar que usuario exista
  if (!user) {
    errorMessage(res, 'El Usuario no existe', 404)
    return
  }
  //Revisar si el usuario confirmo su cuenta
  if (!user.verified) {
    errorMessage(res, 'Tu cuenta no ha sido confirmada aun', 403)
    return
  }

  //Comprobar el password
  if (await user.checkPassword(password)) {
    const token = generateJWT(user._id)
    console.log(token)
    res.json({
      token
    })
  } else {
    errorMessage(res, 'El password es incorrecto', 401)
    return
  }
}

const user = async (req,res) => {
  console.log("3")
  const { user } = req

  res.json(user)
   

}

export { register, verifyAccount, login, user }
