import User from "../../models/user-Model.js";

const loginController = async (req, res) => {
  try {
    const { role,email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    if(userExist.role !== role){
      return res.status(400).json({msg:"User with this role not found"})
  }
    const ispasswordValid = await userExist.comparePassword(password);

    if (ispasswordValid) {
      res.status(200).send({
        success: true,
        message: "Login Successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default loginController;
