import { log } from 'console';
import mongoose from 'mongoose'

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true)

    if(!process.env.MONGODB_URI){
        throw new Error('MONGODB_URI is not set')
    }
    if(isConnected){
        return console.log("The connection is already stablished")
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: '   '
        })
        isConnected = true
        console.log("Connection to database stablished");
        
    } catch (error) {
        console.error(error)
    }


}
