import bcrypt from "bcryptjs";
import User from "../../models/user-Model.js";

const updateUserController = async (req, res) => {
  try {
    const userData = req.user;
    const { fullName, userName, email, newPassword } = req.body;
    const image = req.file ? req.file.filename : userData.image;

    const userExist = await User.findOne({ email: userData.email });

    // Check if the new username already exists in another account
    if (userName && userName !== userData.userName) {
      const userNameExist = await User.findOne({ userName });
      if (userNameExist) {
        return res.status(400).json({ msg: "Username already exists" });
      }
    }

    // Check if the new email already exists in another account
    if (email && email !== userData.email) {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({ msg: "Email already exists" });
      }
    }

    // Prepare the update data
    let updateUserData = { image };

    // Add non-empty fields to updateUserData
    if (fullName) updateUserData.fullName = fullName;
    if (userName) updateUserData.userName = userName;
    if (email) updateUserData.email = email;

    // Hash and update the new password if provided
    if (newPassword) {
      const hashPassword = await bcrypt.hash(newPassword, 10);
      updateUserData.password = hashPassword;
    }

    // Update user data
    await User.updateOne({ _id: userData._id }, { $set: updateUserData });

    res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default updateUserController;
