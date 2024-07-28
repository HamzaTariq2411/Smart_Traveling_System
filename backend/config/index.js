import dotenv from 'dotenv'

dotenv.config();

const Port = process.env.PORT  || 8050 ;
const Mongo_Url =process.env.MONGO_URL;
const JwtKey = process.env.JWT_KEY;

export {
    Port,
    Mongo_Url,
    JwtKey,
}