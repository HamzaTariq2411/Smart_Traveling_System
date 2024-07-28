import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useAuth } from "../../store/auth";
import { baseUrl } from "../helper";

const PasswordVerificationPopup = ({ onSuccess, onClose }) => {
  const { token } = useAuth();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/verifyPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.dismiss();
        toast.success("Password verified successfully");
        onSuccess();
      } else {
        toast.dismiss();
        toast.error(data.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred while verifying password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="ml-14 mx-2 bg-white p-6 rounded shadow-md sm:w-80 w-auto text-black">
        <h2 className="text-xl font-bold mb-4">Verify Password</h2>
        <form onSubmit={handlePasswordSubmit}>
          <div className="relative mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <div
              onClick={handlePasswordVisibility}
              className="absolute top-12 right-3 cursor-pointer text-black"
            >
              {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordVerificationPopup;
