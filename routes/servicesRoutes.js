import { Router } from 'express'

import {
  getServices,
  createService,
  getServiceById,
  updateService,
  deleteService,
} from '../controllers/ServicesController.js'

const servicesRoutes = Router()

servicesRoutes.get('/', getServices)
servicesRoutes.post('/', createService)
servicesRoutes.get('/:id', getServiceById)
servicesRoutes.put('/:id', updateService)
servicesRoutes.delete('/:id', deleteService)

export default servicesRoutes 

//EbpkaHwFCk2UG5Di
