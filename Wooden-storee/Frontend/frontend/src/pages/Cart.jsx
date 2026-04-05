import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const subtotal = cart.reduce((acc, item) => acc + Number(item.price), 0);
  const shipping = subtotal >= 5000 ? 0 : 499;
  const total = subtotal + shipping;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: 50,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 100 },
    },
  };

  const summaryVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.3, duration: 0.6 },
    },
  };

  const cartItemImageVariants = {
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, y: -2, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const freeShippingVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const priceVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-50 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
        {/* Background elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl -z-10"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl -z-10"
        />

        <motion.div
          variants={emptyStateVariants}
          initial="hidden"
          animate="visible"
          className="text-center z-10"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🛒
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-bold text-stone-900 mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Your cart is empty
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-stone-500 text-base mb-8"
          >
            Looks like you haven't added anything yet. Let's find something
            amazing!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-xl text-base font-bold hover:shadow-xl transition-all no-underline"
            >
              <span>Browse products</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-50 min-h-screen py-12 px-6 relative overflow-hidden"
    >
      {/* Background gradients */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1
            className="text-5xl font-bold text-stone-900"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Your cart
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-stone-500 text-base mt-2"
          >
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.cartId}
                  variants={itemVariants}
                  whileHover="hover"
                  layout
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="flex overflow-hidden">
                    {/* Image */}
                    <motion.div
                      variants={cartItemImageVariants}
                      whileHover="hover"
                      className="w-28 h-28 bg-gradient-to-br from-amber-50 to-stone-50 flex items-center justify-center flex-shrink-0 overflow-hidden"
                    >
                      <img
                        src={item.images?.[0] || item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentNode.innerHTML =
                            "<span class='text-5xl'>🪑</span>";
                        }}
                      />
                    </motion.div>

                    {/* Details */}
                    <div className="flex-1 px-6 py-4 flex items-center justify-between">
                      <div>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full inline-block uppercase tracking-widest"
                        >
                          {item.category || "Furniture"}
                        </motion.span>
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.15 }}
                          className="text-base font-bold text-stone-900 mt-2 mb-1"
                        >
                          {item.name}
                        </motion.h3>
                        <motion.p
                          variants={priceVariants}
                          initial="initial"
                          animate="animate"
                          className="text-xl font-bold text-stone-900"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          ₹{Number(item.price).toLocaleString("en-IN")}
                        </motion.p>
                      </div>

                      {/* Action Buttons */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col gap-2 items-end"
                      >
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="px-6 py-2 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all"
                        >
                          Buy now
                        </motion.button>
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={() => removeFromCart(item.cartId)}
                          className="px-4 py-2 text-red-600 border-2 border-red-300 rounded-lg text-xs font-semibold hover:bg-red-50 transition-all bg-transparent cursor-pointer"
                        >
                          Remove
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            variants={summaryVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl border border-stone-200 p-7 sticky top-24 shadow-lg"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-lg font-bold text-stone-900 mb-6"
            >
              Order summary
            </motion.h2>

            {/* Summary Items */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3 mb-6"
            >
              {/* Subtotal */}
              <motion.div
                variants={itemVariants}
                className="flex justify-between items-center"
              >
                <span className="text-sm text-stone-600">
                  Subtotal ({cart.length} {cart.length === 1 ? "item" : "items"}
                  )
                </span>
                <motion.span
                  variants={priceVariants}
                  initial="initial"
                  animate="animate"
                  className="font-bold text-stone-900"
                >
                  ₹{subtotal.toLocaleString("en-IN")}
                </motion.span>
              </motion.div>

              {/* Shipping */}
              <motion.div
                variants={itemVariants}
                className="flex justify-between items-center"
              >
                <span className="text-sm text-stone-600">Shipping</span>
                <motion.span
                  variants={priceVariants}
                  initial="initial"
                  animate="animate"
                  className={`font-bold ${
                    shipping === 0 ? "text-green-600" : "text-stone-900"
                  }`}
                >
                  {shipping === 0 ? (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      Free 🎉
                    </motion.span>
                  ) : (
                    `₹${shipping}`
                  )}
                </motion.span>
              </motion.div>

              {/* Free Shipping Message */}
              <AnimatePresence>
                {shipping > 0 && (
                  <motion.div
                    variants={freeShippingVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-xl px-4 py-3 text-sm text-amber-700 font-medium"
                  >
                    ✨ Add ₹{(5000 - subtotal).toLocaleString("en-IN")} more for{" "}
                    <span className="font-bold">FREE shipping!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Total */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              className="border-t-2 border-stone-200 pt-6 mb-6"
              style={{ transformOrigin: "left" }}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-stone-900">Total</span>
                <motion.span
                  variants={priceVariants}
                  initial="initial"
                  animate="animate"
                  className="text-3xl font-bold text-stone-900"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  ₹{total.toLocaleString("en-IN")}
                </motion.span>
              </div>
            </motion.div>

            {/* Checkout Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              className="w-full py-4 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to checkout</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link
                to="/"
                className="block text-center text-xs text-stone-400 mt-5 no-underline hover:text-stone-600 transition-colors font-medium"
              >
                ← Continue shopping
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
