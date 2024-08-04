import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUpValidation } from "../Validation/SignUpValidation";
import { FaHome } from "react-icons/fa";
import { baseUrl } from "../components/helper";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [userImage, setuserImage] = useState();

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const [user, setUser] = useState({
    role: "",
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", user.role);
    formData.append("fullName", user.fullName);
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("image", userImage);
    try {
      await signUpValidation.validate(user, { abortEarly: false });
      const response = await fetch(`${baseUrl}/api/signup`, {
        method: "POST",
        headers: {},
        body: formData,
      });
      if (response.ok === true) {
        setLoading(false)
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        setUser({
          role: "",
          fullName: "",
          userName: "",
          email: "",
          password: "",
          image: "",
        });
        toast.dismiss();
        toast.success("SignUp Successfully");
        navigate("/profile");
      } else {
        setLoading(false)
        const res_data = await response.json();
        toast.dismiss();
        toast.error(res_data.msg);
      }
    } catch (error) {
      setLoading(false)
      const firstError = error.inner[0];
      toast.dismiss();
      toast.error(firstError.message);
    }
  };
  return (
    <div className="text-white bg-cover bg-fixed bg-Signup min-h-screen overflow-y-auto">
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-900 bg-opacity-70 mix-blend-normal overflow-y-auto">
        <NavLink to="/" className="fixed top-2 left-2 text-2xl">
          <FaHome />
        </NavLink>
        <div className="z-20 p-10 w-64 sm:w-96">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <h2 className="text-center text-3xl  pb-3">Sign Up</h2>
            <div className="relative border-b-2 border-gray-300 my-3">
              <select
                className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
                required
                autoComplete="off"
                name="role"
                value={user?.role}
                onChange={handleInputs}
              >
                <option className="text-black" value="">
                  Select Role
                </option>
                <option className="text-black" value="Tourist">
                  Tourist
                </option>
                <option className="text-black" value="Hotel Admin">
                  Hotel Admin
                </option>
                <option className="text-black" value="Flight Admin">
                  Flight Admin
                </option>
              </select>
            </div>
            <div className="relative border-b-2 border-gray-300 my-3">
              <input
                className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
                type="text"
                required
                placeholder="Enter Full Name"
                autoComplete="off"
                name="fullName"
                value={user?.fullName}
                onChange={handleInputs}
              />
            </div>
            <div className="relative border-b-2 border-gray-300 my-3">
              <input
                className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
                type="text"
                placeholder="Enter Username"
                required
                autoComplete="off"
                name="userName"
                value={user?.userName}
                onChange={handleInputs}
              />
            </div>
            <div className="relative border-b-2 border-gray-300 my-3">
              <input
                className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
                type="email"
                placeholder="Enter Your Email"
                autoComplete="off"
                required
                name="email"
                value={user?.email}
                onChange={handleInputs}
              />
            </div>
            <div className="relative border-b-2 border-gray-300 my-3">
              <input
                className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                required
                autoComplete="off"
                name="password"
                value={user?.password}
                onChange={handleInputs}
              />
              <div
                onClick={handleToggle}
                className="absolute top-4 right-2 cursor-pointer"
              >
                {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              </div>
            </div>
            <div className="relative border-b-2 border-gray-300 my-3">
              <input
                className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Confirm Password"
                required
                autoComplete="off"
                name="confirmPassword"
                value={user?.confirmPassword}
                onChange={handleInputs}
              />
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
            <button
              className=" bg-white text-black border-none font-semibold text-xs px-3 py-2 md:px-5 md:py-3 rounded-md border-transparent cursor-pointer transition duration-300 ease-in-out hover:text-white hover:border-white hover:bg-opacity-50 hover:bg-black
            my-3 "
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <div className="text-center mt-2 text-xs sm:text-sm md:text-base">
              <p>
                Do you have an account?{"  "}
                {isLoggedIn ? (
                  <NavLink to="/profile" className="hover:underline">
                    Log In
                  </NavLink>
                ) : (
                  <NavLink to="/login" className="hover:underline">
                    Log In
                  </NavLink>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
