import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { cart } = useContext(CartContext);

  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
  };

  return (
    <>
      {/* 🔥 Fixed Navbar */}
      <div className="bg-white/90 backdrop-blur shadow px-8 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        
        <Link to="/" className="text-2xl font-bold">
          🪑 Furniture
        </Link>

        <div className="flex items-center gap-6">

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>

          {/* Admin */}
          {role === "admin" && <Link to="/admin">Admin</Link>}

          {/* NOT LOGGED IN */}
          {!token && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {/* LOGGED IN */}
          {token && (
            <button
              onClick={handleLogout}
              className="text-red-500 font-medium"
            >
              Logout
            </button>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative">
            🛒
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
              {cart.length}
            </span>
          </Link>

        </div>
      </div>

      {/* 🔥 Spacer (important warna content overlap karega) */}
      <div className="h-20"></div>
    </>
  );
}