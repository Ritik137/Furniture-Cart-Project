import { useState } from "react";
import { authAPI } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    if (!data.name || !data.email || !data.password) return setError("Please fill in all fields.");
    try {
      setLoading(true);
      await authAPI.post("/register", data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left panel */}
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
          <h2 className="text-3xl font-normal text-white mb-4 leading-snug" style={{ fontFamily: "Georgia, serif" }}>
            Join thousands of<br />
            <em className="text-amber-400">happy homeowners.</em>
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed">
            Discover premium furniture curated for modern living. Quality you can feel, delivered to your door.
          </p>
        </div>

        <div className="space-y-3">
          {[
            { icon: "✓", text: "Free shipping on orders above ₹5,000" },
            { icon: "✓", text: "Easy returns within 30 days" },
            { icon: "✓", text: "Trusted by 10,000+ customers" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <span className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{icon}</span>
              <span className="text-stone-400 text-sm">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-stone-50">
        <div className="w-full max-w-sm">

          <h1 className="text-3xl font-normal text-stone-900 mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Create account
          </h1>
          <p className="text-stone-400 text-sm mb-8">Start your furniture journey today</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {[
              { key: "name", label: "Full name", type: "text", placeholder: "Ritik Anand" },
              { key: "email", label: "Email address", type: "email", placeholder: "you@example.com" },
              { key: "password", label: "Password", type: "password", placeholder: "Min. 8 characters" },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">{label}</label>
                <input type={type} placeholder={placeholder} value={data[key]}
                  onChange={e => setData({ ...data, [key]: e.target.value })}
                  onKeyDown={e => e.key === "Enter" && handleRegister()}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl text-sm bg-white text-stone-900 focus:outline-none focus:border-stone-900 transition-colors placeholder:text-stone-300" />
              </div>
            ))}
          </div>

          <button onClick={handleRegister} disabled={loading}
            className="w-full mt-6 py-3.5 bg-stone-900 text-white rounded-xl text-sm font-semibold hover:bg-stone-700 disabled:bg-stone-400 transition-all duration-200 hover:shadow-lg">
            {loading ? "Creating account..." : "Create account →"}
          </button>

          <p className="text-center text-sm text-stone-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-stone-900 font-semibold no-underline hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
