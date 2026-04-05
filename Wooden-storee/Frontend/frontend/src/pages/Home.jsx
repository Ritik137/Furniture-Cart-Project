import { useEffect, useState, useContext } from "react";
import { productAPI } from "../utils/api";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    productAPI
      .get("/getall")
      .then((res) => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch(console.log)
      .finally(() => setLoading(false));

    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const res = await fetch("http://localhost:5006/api/banner/get");
      const data = await res.json();
      setBanner(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = (p) => {
    addToCart(p);
    setAddedId(p._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const heroTagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "backOut" },
    },
  };

  const heroTitleVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
    hover: { scale: 1.05, y: -4, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.5 + i * 0.1, duration: 0.5 },
    }),
  };

  const heroImageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 },
    },
    hover: { scale: 1.05, rotate: 5, transition: { duration: 0.3 } },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: 0.8, duration: 0.5, type: "spring", stiffness: 120 },
    },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  };

  const skeletonVariants = {
    loading: { opacity: [0.6, 1, 0.6] },
  };

  return (
    <div className="bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50 min-h-screen overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
        className="fixed top-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl -z-10"
      />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Tag */}
          <motion.div variants={heroTagVariants}>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-700 bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 px-4 py-1.5 rounded-full mb-6 shadow-sm">
              ✨ New Collection 2026
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={heroTitleVariants}
            className="text-6xl font-bold leading-tight text-stone-900 mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Furniture that
            <br />
            <motion.em
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 not-italic font-bold"
            >
              feels like home.
            </motion.em>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-stone-600 text-lg leading-relaxed mb-8 max-w-md font-light"
          >
            Handpicked pieces designed for comfort, style, and the everyday
            moments that matter most.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={containerVariants} className="flex gap-3 mb-12">
            <motion.button
              custom={0}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-7 py-3 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Shop now
            </motion.button>
            <motion.button
              custom={1}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-7 py-3 border-2 border-stone-300 text-stone-700 rounded-xl text-sm font-semibold hover:border-amber-400 hover:bg-amber-50 transition-all"
            >
              View catalogue
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex gap-8 pt-8 border-t border-stone-200"
            style={{ transformOrigin: "left" }}
          >
            {[
              ["500+", "Products"],
              ["10k+", "Customers"],
              ["Free", "Shipping ₹5k+"],
            ].map(([num, label], i) => (
              <motion.div
                key={label}
                custom={i}
                variants={statsVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="text-2xl font-bold text-stone-900"
                  style={{ fontFamily: "Georgia, serif" }}
                  whileHover={{ scale: 1.1, color: "#b45309" }}
                >
                  {num}
                </motion.div>
                <div className="text-xs text-stone-400 mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={heroImageVariants}
            whileHover="hover"
            className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-3xl h-96 flex items-center justify-center text-8xl shadow-2xl cursor-pointer relative overflow-hidden"
          >
            {banner?.image ? (
              <img
                src={banner.image}
                alt="banner"
                className="w-full h-full object-cover"
              />
            ) : (
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-8xl"
              >
                🛋️
              </motion.div>
            )}
            {/* <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-8xl"
            >
              🛋️
            </motion.div> */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-amber-300 to-transparent"
            />
          </motion.div>

          {/* Floating Badge */}
          <motion.div
            variants={badgeVariants}
            whileHover="hover"
            className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4 cursor-pointer"
          >
            <motion.span
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl"
            >
              ⭐
            </motion.span>
            <div>
              <div className="text-sm font-bold text-stone-900">
                Rated 4.9/5
              </div>
              <div className="text-xs text-stone-400">by 2,400+ buyers</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Products Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 pb-20 relative z-10"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-baseline justify-between mb-10"
        >
          <h2
            className="text-4xl font-bold text-stone-900"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Explore our collection
          </h2>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-sm font-semibold text-amber-700 bg-amber-100 px-4 py-1.5 rounded-full"
          >
            {products.length} products
          </motion.span>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded-2xl border border-stone-100 overflow-hidden"
              >
                <motion.div
                  animate={skeletonVariants.loading}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-52 bg-gradient-to-r from-stone-100 to-stone-50"
                />
                <div className="p-4 space-y-3">
                  <motion.div
                    animate={skeletonVariants.loading}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="h-3 bg-stone-100 rounded w-1/3"
                  />
                  <motion.div
                    animate={skeletonVariants.loading}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                    className="h-4 bg-stone-100 rounded w-2/3"
                  />
                  <motion.div
                    animate={skeletonVariants.loading}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    className="h-3 bg-stone-100 rounded w-full"
                  />
                  <motion.div
                    animate={skeletonVariants.loading}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    className="h-9 bg-stone-100 rounded mt-4"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📦</div>
            <p className="text-stone-400 text-lg">No products found yet.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {products.map((p) => (
              <motion.div key={p._id} variants={itemVariants}>
                <ProductCard p={p} handleAdd={handleAdd} addedId={addedId} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
