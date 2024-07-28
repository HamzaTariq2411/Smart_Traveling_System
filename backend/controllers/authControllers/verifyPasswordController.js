import bcrypt from "bcryptjs";
import User from "../../models/user-Model.js";

const verifyPasswordController = async (req, res) => {
  try {
    const { password } = req.body;
    const userData = req.user;

    const userExist = await User.findOne({ email: userData.email });

    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    res.status(200).json({ msg: "Password verified" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export default verifyPasswordController;
