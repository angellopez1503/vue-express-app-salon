import mongoose from 'mongoose'

export const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}
