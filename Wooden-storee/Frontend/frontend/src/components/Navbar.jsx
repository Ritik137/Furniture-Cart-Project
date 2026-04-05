import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
  };

  const isActive = (path) => location.pathname === path;

  // Animation variants
  const brandVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0, transition: { duration: 0.6, type: "spring", stiffness: 100 } },
    hover: { rotate: 5, scale: 1.1, transition: { duration: 0.2 } },
  };

  const navLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hover: { scale: 1.05, y: -2, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const cartBadgeVariants = {
    initial: { scale: 0 },
    animate: { scale: 1, transition: { type: "spring", stiffness: 200, damping: 10 } },
    exit: { scale: 0, transition: { duration: 0.2 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.08, delayChildren: 0.1 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-stone-200"
            : "bg-gradient-to-b from-stone-50 to-stone-50/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <motion.div variants={brandVariants} initial="hidden" animate="visible">
            <Link to="/" className="flex items-center gap-2.5 no-underline group">
              <motion.div
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-amber-300/50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="13" width="20" height="5" rx="2" fill="white" />
                  <rect x="4" y="8" width="16" height="6" rx="2" fill="white" opacity="0.7" />
                  <rect x="5" y="18" width="2" height="4" rx="1" fill="white" />
                  <rect x="17" y="18" width="2" height="4" rx="1" fill="white" />
                </svg>
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-lg font-bold text-stone-900 tracking-tight group-hover:text-amber-600 transition-colors"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Furnish
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {/* Main Links */}
            <div className="flex items-center gap-1">
              {[
                { to: "/", label: "Home", index: 0 },
                { to: "/about", label: "About", index: 1 },
              ].map(({ to, label, index }) => (
                <motion.div
                  key={to}
                  custom={index}
                  variants={navLinkVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <Link
                    to={to}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all no-underline relative ${
                      isActive(to)
                        ? "text-stone-900 bg-stone-100"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {label}
                    {isActive(to) && (
                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Admin Link */}
              {role === "admin" && (
                <motion.div
                  custom={2}
                  variants={navLinkVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <Link
                    to="/admin"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all no-underline relative ${
                      isActive("/admin")
                        ? "text-amber-900 bg-amber-100"
                        : "text-stone-600 hover:text-amber-700 hover:bg-amber-50"
                    }`}
                  >
                    ⚙️ Admin
                    {isActive("/admin") && (
                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="w-px h-5 bg-gradient-to-b from-transparent via-stone-300 to-transparent mx-2"
              style={{ transformOrigin: "center" }}
            />

            {/* Auth Buttons */}
            {!token ? (
              <div className="flex items-center gap-2">
                <motion.div
                  custom={3}
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all no-underline"
                  >
                    Login
                  </Link>
                </motion.div>

                <motion.div
                  custom={4}
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg hover:shadow-amber-300/50 transition-all no-underline"
                  >
                    Register
                  </Link>
                </motion.div>
              </div>
            ) : (
              <motion.div
                custom={3}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 border-2 border-red-300 hover:bg-red-50 hover:border-red-400 transition-all cursor-pointer bg-transparent"
                >
                  Logout
                </button>
              </motion.div>
            )}

            {/* Cart Button */}
            <motion.div
              custom={5}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              className="ml-2"
            >
              <Link
                to="/cart"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-stone-300 bg-white text-sm font-bold text-stone-900 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-200/30 transition-all no-underline relative"
              >
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  whileHover={{ rotate: 10, scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </motion.svg>
                <span>Cart</span>
                <AnimatePresence>
                  {cart.length > 0 && (
                    <motion.span
                      variants={cartBadgeVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg"
                    >
                      {cart.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-stone-900 rounded-full"
            />
            <motion.div
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-stone-900 rounded-full"
            />
            <motion.div
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-stone-900 rounded-full"
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 px-6 py-4 flex flex-col gap-3"
            >
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                ...(role === "admin" ? [{ to: "/admin", label: "⚙️ Admin" }] : []),
              ].map(({ to, label }) => (
                <motion.div key={to} variants={mobileItemVariants}>
                  <Link
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2 rounded-lg text-sm font-medium no-underline ${
                      isActive(to)
                        ? "bg-amber-100 text-amber-900"
                        : "text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={mobileItemVariants} className="border-t border-stone-200 pt-3 mt-2">
                {!token ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-100 no-underline"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-amber-600 to-orange-600 text-white no-underline"
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="w-full px-4 py-2 rounded-lg text-sm font-medium text-red-600 border-2 border-red-300 hover:bg-red-50 bg-transparent"
                  >
                    Logout
                  </button>
                )}
              </motion.div>

              <motion.div variants={mobileItemVariants}>
                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-stone-300 bg-white text-sm font-bold text-stone-900 no-underline"
                >
                  🛒 Cart
                  {cart.length > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-16" />
    </>
  );
}