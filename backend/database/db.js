import mongoose from 'mongoose';
import { Mongo_Url } from '../config/index.js'

const connectToDB = async () =>{
    try {
        const connection = await mongoose.connect(Mongo_Url);
        console.log(`Connect to DB `);
    } catch (error) {
        console.log(error);
    }
}

export default connectToDB ;