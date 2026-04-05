import { useState, useEffect } from "react";
import { authAPI } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []);

  const handleLogin = async () => {
    setError("");
    if (!data.email || !data.password) return setError("Please fill in all fields.");
    try {
      setLoading(true);
      const res = await authAPI.post("/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left dark panel */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-stone-900 p-12">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="13" width="20" height="5" rx="2" fill="#1a1a1a" />
              <rect x="4" y="8" width="16" height="6" rx="2" fill="#1a1a1a" opacity="0.7" />
              <rect x="5" y="18" width="2" height="4" rx="1" fill="#1a1a1a" />
              <rect x="17" y="18" width="2" height="4" rx="1" fill="#1a1a1a" />
            </svg>
          </div>
          <span className="text-white text-lg font-semibold" style={{ fontFamily: "Georgia, serif" }}>Furnish</span>
        </div>

        <div>
          <p className="text-4xl font-normal text-white leading-snug mb-4" style={{ fontFamily: "Georgia, serif" }}>
            "Great design is<br />
            <em className="text-amber-400">making something<br />memorable."</em>
          </p>
          <p className="text-stone-500 text-sm">— Tibor Kalman</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {["🛋️ Sofas", "🪑 Chairs", "🛏️ Beds", "🪞 Mirrors"].map(item => (
            <div key={item} className="bg-stone-800 rounded-xl px-4 py-3 text-stone-400 text-sm">{item}</div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-stone-50">
        <div className="w-full max-w-sm">

          <h1 className="text-3xl font-normal text-stone-900 mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Welcome back
          </h1>
          <p className="text-stone-400 text-sm mb-8">Sign in to continue to your account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Email address</label>
              <input type="email" placeholder="you@example.com" value={data.email}
                onChange={e => setData({ ...data, email: e.target.value })}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl text-sm bg-white text-stone-900 focus:outline-none focus:border-stone-900 transition-colors placeholder:text-stone-300" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Password</label>
              <input type="password" placeholder="••••••••" value={data.password}
                onChange={e => setData({ ...data, password: e.target.value })}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl text-sm bg-white text-stone-900 focus:outline-none focus:border-stone-900 transition-colors placeholder:text-stone-300" />
            </div>
          </div>

          <button onClick={handleLogin} disabled={loading}
            className="w-full mt-6 py-3.5 bg-stone-900 text-white rounded-xl text-sm font-semibold hover:bg-stone-700 disabled:bg-stone-400 transition-all duration-200 hover:shadow-lg">
            {loading ? "Signing in..." : "Sign in →"}
          </button>

          <p className="text-center text-sm text-stone-400 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-stone-900 font-semibold no-underline hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
