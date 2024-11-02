import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true); // Fixed typo here

    if (!process.env.MONGODB_URI) {
        return console.log('=> no mongodb_url provided');
    }

    if (isConnected) {
        return console.log('=> it is already connected');    
    }

    
    
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'devflow'
        });
        isConnected = true;
        console.log('=> connection to database is successful');
        
    } catch (error) {
        console.error(error); // Updated from logError to console.error
    }
};
