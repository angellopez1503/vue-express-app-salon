import Services from '../models/Services.js'
import {
  errorMessage,
  isNotExistsItem,
  isNotValidObjectId,
} from '../util/index.js'

const createService = async (req, res) => {
  if (Object.values(req.body).includes('')) {
    errorMessage(res, 'Todos los campos son obligatorios', 400)
    return
  }
  try {
    const service = new Services(req.body)
    await service.save()
    res.json({
      msg: 'El servicio se registro correctamente',
    })
  } catch (error) {
    console.log(error)
  }
}

const getServices = async (req, res) => {
  try {
    const services = await Services.find()
    res.json(services)
  } catch (error) {
    console.log(error)
  }
}

const getServiceById = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    errorMessage(res, 'El ID no es valido', 400)
    return
  }
  const service = await Services.findById(id)
  if (!item) {
    errorMessage(res, 'El Servicio no existe', 404)
    return
  }
  res.json(service)
}

const updateService = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    errorMessage(res, 'El ID no es valido', 400)
    return
  }
  const service = await Services.findById(id)
  if (!item) {
    errorMessage(res, 'El Servicio no existe', 404)
    return
  }
  service.name = req.body.name || service.name
  service.price = req.body.price || service.price
  try {
    await service.save()
    res.json({
      msg: 'El servicio se actualizo correctamente',
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteService = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    errorMessage(res, 'El ID no es valido', 400)
    return
  }
  const service = await Services.findById(id)
  if (!item) {
    errorMessage(res, 'El Servicio no existe', 404)
    return
  }
  try {
    await service.deleteOne()
    res.json({
      msg: 'El servicio se elimino correctamente',
    })
  } catch (error) {
    console.log(error)
  }
}

export {
  getServices,
  createService,
  getServiceById,
  updateService,
  deleteService,
}
