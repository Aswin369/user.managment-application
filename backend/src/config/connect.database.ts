import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async():Promise<void>=>{
    try{
        const mongoURI = process.env.MONGODB_URL as string
        if(!mongoURI) {
            throw new Error('Mongo url is not found in enviroment variable')
        }
        await mongoose.connect(mongoURI)
        console.log("Database Connected")
    }catch(err){
        console.error('MongoDB connection faild',err)
        process.exit(1)
    }
}

export default connectDB
