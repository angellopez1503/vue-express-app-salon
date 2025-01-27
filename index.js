import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'

// Variables de entorno
dotenv.config()

//Configurar la app
const app = express()

//Leer datos via body
app.use(express.json())

//Conectar a BD

db()

//Configurar CORS
const whiteList = [process.env.FRONTEND_URL,undefined]
const corsOptions = {
  origin:(origin,callback)=>{
    if(whiteList.includes(origin)){
        callback(null,true)
    }else{
      callback(new Error('Error de CORS'))
    }
  }
}

app.use(cors(corsOptions))

//Definir ruta
app.use('/api/auth', authRoutes)
app.use('/api/services', servicesRoutes)


//Definir puerto
const PORT = process.env.PORT || 4000

//Arrancar app

app.listen(PORT, () => {
  console.log('El servidor se esta ejecutando en el puerto: ', PORT)
})
