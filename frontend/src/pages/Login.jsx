import React, { useState } from "react";
import { loginbg } from "../images";
import { NavLink } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../store/auth";
import { FaHome } from "react-icons/fa";
import { baseUrl } from "../components/helper";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  const [user, setUser] = useState({
    role: "",
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok === true) {
        setLoading(false);
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        toast.dismiss();
        toast.success("Login Successfully");
        navigate("/profile");
      } else {
        const res_data = await response.json();
        setLoading(false);
        toast.dismiss();
        toast.error(res_data.msg);
      }
    } catch (error) {
      setLoading(false);
      toast.dismiss();
      toast.error("Something went wrong");
      console.log("Error in login", error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center justify-center min-h-svh w-full px-10 text-white absolute bg-gray-900 bg-opacity-80">
      <img
        src={loginbg}
        alt=""
        className="w-full min-h-svh object-cover absolute mix-blend-overlay"
      />
      <NavLink to="/" className="fixed top-2 left-2 text-2xl">
        <FaHome />
      </NavLink>
      <div className="z-20 p-10 text-center w-96">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h2 className="text-3xl mb-5">Log In</h2>
          <div className="relative border-b-2 border-gray-300 my-3">
            <select
              className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
              required
              autoComplete="off"
              name="role"
              value={user.role}
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
              type="email"
              placeholder="Enter Your Email"
              required
              autoComplete="off"
              name="email"
              value={user.email}
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
              value={user.password}
              onChange={handleInputs}
            />
            <div
              onClick={handleToggle}
              className="absolute top-4 right-2 cursor-pointer"
            >
              {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
            </div>
          </div>
          {/* <div className="flex items-center justify-between mt-4 mb-6">
            <a
              className="text-white no-underline hover:underline text-xs sm:text-sm md:text-base"
              href="/forgot-password"
            >
              Forgot Password?
            </a>
          </div> */}
          <button
            className="mt-4 bg-white text-black border-none font-semibold text-xs px-3 py-2 md:px-5 md:py-3 rounded-md border-transparent cursor-pointer transition duration-300 ease-in-out hover:text-white hover:border-white hover:bg-opacity-50 hover:bg-black"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading...." : "Log In"}
          </button>
          <div className="text-center mt-4 text-xs sm:text-sm md:text-base">
            <p>
              Don't Have an account?{"  "}
              <NavLink to="/signup" className="hover:underline">
                Register
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
