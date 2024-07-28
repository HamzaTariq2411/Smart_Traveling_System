import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import PasswordVerificationPopup from "./PasswordVerificationPopup";
import { baseUrl } from "../helper";

const UpdateProfile = () => {
  const { user } = useAuth();
  const { token } = useAuth();
  const [shownewPassword, setShownewPassword] = useState(false);
  const [userImage, setuserImage] = useState();
  const [updateUser, setUpdateUser] = useState({
    fullName: user.fullName,
    userName: user.userName,
    email: user.email,
    password: "",
    newPassword: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleNewpass = () => {
    setShownewPassword(!shownewPassword);
  };

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUpdateUser({
      ...updateUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // If new password is provided, validate it
      if (updateUser.newPassword !== "") {
        let newPasswordError = "";

        if (updateUser.newPassword.length < 8) {
          newPasswordError = "New password must be at least 8 characters long";
        } else if (!/(?=.*[a-z])/.test(updateUser.newPassword)) {
          newPasswordError =
            "New password must contain at least one lowercase letter";
        } else if (!/(?=.*[A-Z])/.test(updateUser.newPassword)) {
          newPasswordError =
            "New password must contain at least one uppercase letter";
        } else if (!/(?=.*\d)/.test(updateUser.newPassword)) {
          newPasswordError = "New password must contain at least one digit";
        }
        if (newPasswordError) {
          toast.dismiss();
          toast.error(newPasswordError);
          setLoading(false);
          return;
        }
      }

      const formData = new FormData();
      formData.append("fullName", updateUser.fullName);
      formData.append("userName", updateUser.userName);
      formData.append("email", updateUser.email);
      formData.append("newPassword", updateUser.newPassword);
      formData.append("image", userImage);

      const response = await fetch(`${baseUrl}/api/updateUser`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const res_data = await response.json();

      if (response.ok === true) {
        setUpdateUser((prevUser) => ({
          ...prevUser,
          newPassword: "",
          image: "",
        }));
        toast.dismiss();
        toast.success(res_data.message);
      } else {
        toast.dismiss();
        toast.error(res_data.msg);
      }
    } catch (error) {
      const firstError = error.inner[0];
      toast.dismiss();
      toast.error(firstError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent">
      {!isVerified && (
        <PasswordVerificationPopup
          onSuccess={() => setIsVerified(true)}
          onClose={() => setIsVerified(false)}
        />
      )}
      {isVerified && (
        <div className="flex justify-center">
          <div className="p-10 ml-5 sm:w-96 w-64">
            <form className="flex flex-col " onSubmit={handleSubmit}>
              <h2 className="md:text-3xl text-lg mb-5 text-center">
                Update Your Profile
              </h2>
              <div className="relative my-3 flex flex-col gap-2 text-xs text-white  sm:text-sm md:text-base ">
                <label htmlFor="fullName">Full Name</label>
                <input
                  className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2 "
                  type="text"
                  name="fullName"
                  required
                  autoComplete="off"
                  value={updateUser?.fullName}
                  onChange={handleInputs}
                  placeholder="Enter Your fullname"
                />
              </div>
              <div className="relative my-3 flex flex-col gap-2 text-xs text-white  sm:text-sm md:text-base ">
                <label htmlFor="userName">Username</label>
                <input
                  className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2 "
                  type="text"
                  required
                  autoComplete="off"
                  name="userName"
                  value={updateUser?.userName}
                  onChange={handleInputs}
                  placeholder="Enter Username"
                />
              </div>
              <div className="relative my-3 flex flex-col gap-2 text-xs text-white  sm:text-sm md:text-base ">
                <label htmlFor="email">Email</label>
                <input
                  className="w-full h-10 bg-black bg-opacity-30 border-solid border-2 border-zinc-800 rounded p-2 "
                  type="email"
                  autoComplete="off"
                  required
                  value={updateUser?.email}
                  onChange={handleInputs}
                  name="email"
                  placeholder="Enter Email"
                />
              </div>
              <div className="relative my-3 flex flex-col gap-2 text-xs text-white  sm:text-sm md:text-base ">
                <label htmlFor="newPassword">Enter New Password</label>
                <input
                  className="w-full h-10 bg-black bg-opacity-30  border-solid border-2 border-zinc-800 rounded p-2"
                  type={shownewPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  autoComplete="off"
                  value={updateUser?.newPassword}
                  onChange={handleInputs}
                  name="newPassword"
                />
                <div
                  onClick={handleNewpass}
                  className="absolute top-11 right-3"
                >
                  {shownewPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </div>
              </div>
              <div className="flex flex-col my-3">
                <label className="text-left">Choose an image</label>
                <input
                  className="bg-white text-black border-none font-semibold text-xs px-3 py-2 md:px-5 md:py-3 rounded-md border-transparent cursor-pointer transition duration-300 ease-in-out hover:text-white hover:border-white hover:bg-opacity-50 hover:bg-black
                  my-3 "
                  type="file"
                  accept="image/jpeg, image/png"
                  name="image"
                  onChange={(e) => setuserImage(e.target.files[0])}
                />
              </div>
              <div>
                <button
                  className="bg-white text-black border-none font-semibold text-xs px-3 py-2 md:px-5 md:py-3 rounded-md border-transparent cursor-pointer transition duration-300 mt-2 ease-in-out hover:text-white hover:border-white hover:bg-opacity-50 hover:bg-black"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading...." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
