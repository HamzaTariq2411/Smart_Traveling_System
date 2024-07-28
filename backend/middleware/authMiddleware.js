import jwt from "jsonwebtoken";
import { JwtKey } from "../config/index.js";
import User from '../models/user-Model.js'

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ msg: "Token is not provided" });
  }
  const jwtToken = token.replace("Bearer ", "");
  
  try {
    const isVerified = jwt.verify(jwtToken, JwtKey);
    //console.log(isVerified);
    const userData = await User.findOne({email:isVerified.email}).select({password:0});

    req.user =userData;
    req.token= token;
    req.userID= userData._id;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized token",error });
  }
};

export default authMiddleware;
