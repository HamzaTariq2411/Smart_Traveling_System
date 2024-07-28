import User from "../../models/user-Model.js";
import bcrypt from "bcryptjs";

const signupController = async (req, res) => {
  try {
    const { role, fullName, userName, email, password } = req.body;
    const image = req.file?.filename ?? "";
    const userExist = await User.findOne({ email: email });
    const userNameExist = await User.findOne({ userName: userName });

    if (userNameExist) {
      return res.status(400).json({ msg: "UserName already existed" });
    }
    if (userExist) {
      return res.status(400).json({ msg: "Email already existed" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userCreated = await User.create({
      role,
      fullName,
      userName,
      email,
      password: hashPassword,
      image,
    });
    res.status(201).send({
      success: true,
      message: "User Successfully created",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

export default signupController;
