import { useState } from "react";
import { authAPI } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await authAPI.post("/register", data);
      alert("Registered Successfully ✅");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Register Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">

      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-96 border">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account 📝
        </h1>

        {/* Name */}
        <input
          placeholder="Full Name"
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Register
        </button>

        {/* Login redirect */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-black font-semibold cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}