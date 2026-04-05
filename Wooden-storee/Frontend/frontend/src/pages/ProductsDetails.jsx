import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { productAPI } from "../utils/api";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await productAPI.get(`/get/${id}`);
      setProduct(res.data);
      setSelectedImage(0);
      setQuantity(1);
      setImageErrors({});
    } catch (err) {
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const imageGalleryVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.1, borderColor: "#b45309" },
  };

  const backButtonVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    hover: { x: -5, transition: { duration: 0.2 } },
  };

  const priceVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.3, type: "spring", stiffness: 100 },
    },
  };

  const specVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.4 + i * 0.08, duration: 0.5 },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } },
    hover: { scale: 1.05, y: -3, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const skeletonVariants = {
    loading: { opacity: [0.6, 1, 0.6] },
  };

  if (loading)
    return (
      <div className="bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-50 min-h-screen py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            animate={skeletonVariants.loading}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Image Skeleton */}
            <div className="bg-gradient-to-r from-stone-100 to-stone-50 rounded-2xl h-96" />

            {/* Content Skeleton */}
            <div className="space-y-4">
              <div className="h-6 bg-stone-100 rounded w-1/3" />
              <div className="h-8 bg-stone-100 rounded w-1/2" />
              <div className="h-10 bg-stone-100 rounded w-2/3" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 bg-stone-100 rounded w-full" />
                ))}
              </div>
              <div className="h-12 bg-stone-100 rounded w-full mt-8" />
            </div>
          </motion.div>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            Product not found
          </h2>
          <p className="text-stone-500 mb-6">
            Sorry, this product doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );

  const finalPrice = product.discountPrice || product.price;
  const discountPercent = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100,
      )
    : 0;

  const images = product.images?.length > 0 ? product.images : [product.image];
  const maxQuantity = product.stock || 0;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-50 min-h-screen py-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <motion.button
          variants={backButtonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
        >
          <span>←</span> Back to products
        </motion.button>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT - Image Gallery */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* Main Image Container */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="relative bg-gradient-to-br from-amber-50 to-stone-50 rounded-2xl overflow-hidden border border-stone-200 h-[500px] w-full"
            >
              <AnimatePresence mode="wait">
                {imageErrors[selectedImage] ? (
                  <motion.div
                    key={`fallback-${selectedImage}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-100 to-stone-100 text-8xl"
                  >
                    🪑
                  </motion.div>
                ) : (
                  <motion.img
                    key={`image-${selectedImage}`}
                    src={images[selectedImage]}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(selectedImage)}
                  />
                )}
              </AnimatePresence>

              {/* Discount Badge - Positioned Absolutely */}
              {discountPercent > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
                  className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-20"
                >
                  {discountPercent}% OFF
                </motion.div>
              )}
            </motion.div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="flex gap-3 overflow-x-auto pb-2"
              >
                {images.map((img, idx) => (
                  <motion.button
                    key={`thumb-${idx}`}
                    variants={imageGalleryVariants}
                    whileHover="hover"
                    onClick={() => {
                      setSelectedImage(idx);
                      setImageErrors((prev) => ({ ...prev, [idx]: false }));
                    }}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg border-2 overflow-hidden transition-all ${
                      selectedImage === idx
                        ? "border-amber-600 shadow-lg"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    {imageErrors[idx] ? (
                      <div className="w-full h-full flex items-center justify-center bg-amber-100 text-2xl">
                        🪑
                      </div>
                    ) : (
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(idx)}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT - Product Details */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Category */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs font-bold tracking-widest uppercase text-amber-700 bg-amber-100 px-3 py-1.5 rounded-full inline-block">
                {product.category || "Furniture"}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-4xl font-bold text-stone-900"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {product.name}
            </motion.h1>

            {/* Rating & Stock Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-xs text-stone-500">(247 reviews)</span>
              </div>
              {product.stock > 0 ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full"
                >
                  ✓ In Stock ({product.stock} available)
                </motion.span>
              ) : (
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                  Out of Stock
                </span>
              )}
            </motion.div>

            {/* Price Section */}
            <motion.div
              variants={priceVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2 py-4 border-y-2 border-stone-200"
            >
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl font-bold text-stone-900">
                  ₹{Number(finalPrice).toLocaleString("en-IN")}
                </span>
                {product.discountPrice && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-stone-400 line-through"
                  >
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </motion.span>
                )}
              </div>
              <p className="text-sm text-stone-500">
                🚚 {product.deliveryTime || "Delivery in 3-5 days"}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-stone-600 leading-relaxed text-base"
            >
              {product.description}
            </motion.p>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-3 bg-stone-50 rounded-xl p-5 border border-stone-200"
            >
              <h3 className="font-bold text-stone-900 text-sm uppercase tracking-widest">
                Specifications
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Material", value: product.material },
                  { label: "Color", value: product.color },
                  { label: "Dimensions", value: product.dimensions },
                  { label: "Warranty", value: product.warranty },
                ].map(({ label, value }, i) => (
                  <motion.div
                    key={label}
                    custom={i}
                    variants={specVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-between items-center text-sm border-b border-stone-200 pb-2 last:border-0"
                  >
                    <span className="font-semibold text-stone-600">
                      {label}
                    </span>
                    <span className="text-stone-900 font-medium">
                      {value || "N/A"}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quantity & Add to Cart */}
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 pt-4"
            >
              {maxQuantity > 0 ? (
                <>
                  {/* Quantity Selector */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-stone-700">
                      Quantity: {quantity} / {maxQuantity}
                    </label>
                    <div className="flex items-center gap-4 bg-stone-100 rounded-xl p-2 w-fit">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity === 1}
                        className={`w-8 h-8 flex items-center justify-center text-lg font-bold rounded-lg transition-all ${
                          quantity === 1
                            ? "text-stone-300 cursor-not-allowed"
                            : "text-stone-600 hover:text-stone-900 hover:bg-stone-200"
                        }`}
                      >
                        −
                      </motion.button>
                      <span className="text-lg font-bold text-stone-900 min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (quantity < maxQuantity) {
                            setQuantity(quantity + 1);
                          }
                        }}
                        disabled={quantity >= maxQuantity}
                        className={`w-8 h-8 flex items-center justify-center text-lg font-bold rounded-lg transition-all ${
                          quantity >= maxQuantity
                            ? "text-stone-300 cursor-not-allowed"
                            : "text-stone-600 hover:text-stone-900 hover:bg-stone-200"
                        }`}
                      >
                        +
                      </motion.button>
                    </div>
                    {quantity === maxQuantity && maxQuantity > 0 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-amber-600 font-medium"
                      >
                        ⚠️ Maximum quantity reached
                      </motion.p>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <AnimatePresence mode="wait">
                    {!addedToCart ? (
                      <motion.button
                        key="add"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                        onClick={handleAddToCart}
                        className="w-full py-4 font-bold rounded-xl shadow-lg transition-all text-base flex items-center justify-center gap-2 bg-gradient-to-r from-stone-900 to-stone-800 text-white hover:shadow-xl cursor-pointer"
                      >
                        <span>🛒</span>
                        Add {quantity} to Cart
                      </motion.button>
                    ) : (
                      <motion.button
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-base"
                      >
                        <motion.span
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.5 }}
                        >
                          ✓
                        </motion.span>
                        Added {quantity} items to Cart!
                      </motion.button>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full py-4 bg-stone-300 text-stone-500 font-bold rounded-xl shadow-lg text-base flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  <span>📭</span>
                  Out of Stock
                </motion.button>
              )}
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="grid grid-cols-3 gap-3 pt-6 border-t border-stone-200"
            >
              {[
                {
                  icon: "🚚",
                  label: "Free Shipping",
                  desc: "On orders ₹5000+",
                },
                {
                  icon: "🔄",
                  label: "Easy Returns",
                  desc: "30-day return policy",
                },
                { icon: "🛡️", label: "Secure", desc: "Encrypted checkout" },
              ].map(({ icon, label, desc }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 rounded-lg bg-stone-50 hover:bg-amber-50 transition-colors"
                >
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="text-xs font-bold text-stone-900">
                    {label}
                  </div>
                  <div className="text-xs text-stone-500">{desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}