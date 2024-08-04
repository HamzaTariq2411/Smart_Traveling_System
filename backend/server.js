import express from 'express'
import { Port } from './config/index.js';
import connectToDB from './database/db.js';
import router from './routers/authRoute.js'
import roomRouter from './routers/roomRoute.js';
import cors from 'cors';
import bookingsRouter from './routers/bookingsRoute.js';
import airlineRouter from './routers/airlineRoute.js';

const app = express();

const corsOption = {
    // origin:"https://smart-traveling-system.vercel.app",
    origin:"http://localhost:3000",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    cedentials:true,
}

app.use(cors(corsOption));

app.use(express.json());
app.use('/images', express.static('images'));

connectToDB();


app.use('/api', router)
app.use('/api', roomRouter)
app.use('/api', bookingsRouter)
app.use('/api', airlineRouter)





app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
})