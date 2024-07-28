import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JwtKey } from "../config/index.js";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    require: true,
    enum: ["Tourist", "Hotel Admin","Flight Admin"],
    default: "Tourist",
  },
  fullName: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        role:this.role,
        fullName: this.fullName,
        email: this.email,
        image:this.image,
      },
      JwtKey
    );
  } catch (error) {
    console.log(error);
  }
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
 