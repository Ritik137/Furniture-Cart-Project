import { useState, useEffect } from "react";
import { authAPI } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔐 already logged in → redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, []);

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      return alert("All fields required ⚠️");
    }

    try {
      setLoading(true);

      const res = await authAPI.post("/login", data);

      // ✅ save token + role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      alert("Login Successful ✅");

      navigate("/");

    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.error || "Login Failed ❌"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">

      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login 🔐
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
          className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register redirect */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-black font-semibold cursor-pointer"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}