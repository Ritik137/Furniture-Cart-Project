import { useEffect, useState } from "react";
import { productAPI } from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";

export default function Admin() {
  if (localStorage.getItem("role") !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-50 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl -z-10"
        />
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="text-8xl"
        >
          🔒
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-bold text-stone-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Access Denied
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-stone-500 text-base"
        >
          You don't have permission to view this page.
        </motion.p>
      </div>
    );
  }

  const [data, setData] = useState({
    name: "",
    price: "",
    discountPrice: "",
    description: "",
    category: "",
    brand: "",
    stock: "",
    material: "",
    color: "",
    dimensions: "",
    warranty: "",
    deliveryTime: "",
  });
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [bannerFile, setBannerFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productAPI.get("/getall");
      setProducts(res.data.products || res.data || []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    if (!data.name || !data.price) {
      alert("Name and price are required.");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => formData.append(k, v));
      if (file) formData.append("image", file);

      if (editId) {
        await productAPI.put(`/update/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMsg("✅ Product updated successfully!");
      } else {
        await productAPI.post("/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMsg("✅ Product added successfully!");
      }

      setTimeout(() => setSuccessMsg(""), 3000);
      setEditId(null);
      setData({
        name: "",
        price: "",
        discountPrice: "",
        description: "",
        category: "",
        brand: "",
        stock: "",
        material: "",
        color: "",
        dimensions: "",
        warranty: "",
        deliveryTime: "",
      });
      setFile(null);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.msg || "Error saving product.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBannerUpload = async () => {
    if (!bannerFile) {
      alert("Select image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", bannerFile);

    try {
      await fetch("http://localhost:5006/api/banner/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      setSuccessMsg("✅ Banner uploaded successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
      setBannerFile(null);
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await productAPI.delete(`/delete/${id}`);
      setSuccessMsg("✅ Product deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const productVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    hover: { y: -8, shadow: "0 20px 40px rgba(0,0,0,0.1)" },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-50 min-h-screen"
    >
      {/* Header */}
      <motion.div variants={headerVariants} className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl font-bold text-stone-900"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Admin Dashboard
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="text-stone-500 text-sm mt-1"
              >
                Manage your product catalogue and banner
              </motion.p>
            </div>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
              className="bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 text-xs font-bold px-4 py-2 rounded-full border border-amber-200"
            >
              ⚙️ Admin Access
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Success Message */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold z-50"
          >
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Sidebar - Forms */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Banner Upload */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🎨</span>
                <h2 className="text-lg font-bold text-stone-900">Upload Banner</h2>
              </div>

              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBannerFile(e.target.files[0])}
                  className="w-full text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 cursor-pointer"
                />
                {bannerFile && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-green-600 font-medium"
                  >
                    ✓ Selected: {bannerFile.name}
                  </motion.p>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBannerUpload}
                  className="w-full py-3 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Upload Banner →
                </motion.button>
              </div>
            </motion.div>

            {/* Product Form */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-lg transition-all sticky top-28"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{editId ? "✏️" : "➕"}</span>
                <h2 className="text-lg font-bold text-stone-900">
                  {editId ? "Edit Product" : "Add New Product"}
                </h2>
              </div>

              {/* Image Upload */}
              <div className="mb-5">
                <input
                  type="file"
                  accept="image/*"
                  id="fileUpload"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
                <label
                  htmlFor="fileUpload"
                  className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-stone-300 rounded-xl cursor-pointer hover:border-amber-600 hover:bg-amber-50 transition-all overflow-hidden group"
                >
                  {!file ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
                      <div className="text-3xl group-hover:scale-125 transition-transform">📸</div>
                      <span className="text-xs text-stone-500 mt-2 block">Click to upload image</span>
                    </motion.div>
                  ) : (
                    <motion.img
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      src={URL.createObjectURL(file)}
                      className="w-full h-full object-cover"
                      alt="preview"
                    />
                  )}
                </label>
              </div>

              {/* Form Fields */}
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {[
                  { key: "name", label: "Product Name", type: "text", placeholder: "Oslo Sofa" },
                  { key: "price", label: "Price (₹)", type: "number", placeholder: "45000" },
                  { key: "discountPrice", label: "Discount Price", type: "number", placeholder: "40000" },
                  { key: "category", label: "Category", type: "text", placeholder: "Seating" },
                  { key: "brand", label: "Brand", type: "text", placeholder: "IKEA" },
                  { key: "stock", label: "Stock", type: "number", placeholder: "10" },
                  { key: "material", label: "Material", type: "text", placeholder: "Wood" },
                  { key: "color", label: "Color", type: "text", placeholder: "Brown" },
                  { key: "dimensions", label: "Dimensions", type: "text", placeholder: "200x80x90 cm" },
                  { key: "warranty", label: "Warranty", type: "text", placeholder: "1 Year" },
                  { key: "deliveryTime", label: "Delivery Time", type: "text", placeholder: "5-7 days" },
                ].map(({ key, label, type, placeholder }) => (
                  <motion.div key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-widest mb-1.5">
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={data[key]}
                      onChange={(e) => setData({ ...data, [key]: e.target.value })}
                      className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-lg text-sm bg-white text-stone-900 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all placeholder:text-stone-300"
                    />
                  </motion.div>
                ))}

                {/* Description */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-widest mb-1.5">
                    Description
                  </label>
                  <textarea
                    placeholder="Brief product description..."
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-lg text-sm bg-white text-stone-900 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all resize-none placeholder:text-stone-300"
                  />
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full mt-6 py-3 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                      ⚙️
                    </motion.span>
                    {editId ? "Updating..." : "Adding..."}
                  </span>
                ) : editId ? (
                  "Update Product →"
                ) : (
                  "Add Product →"
                )}
              </motion.button>

              {editId && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => {
                    setEditId(null);
                    setData({
                      name: "",
                      price: "",
                      discountPrice: "",
                      description: "",
                      category: "",
                      brand: "",
                      stock: "",
                      material: "",
                      color: "",
                      dimensions: "",
                      warranty: "",
                      deliveryTime: "",
                    });
                    setFile(null);
                  }}
                  className="w-full mt-2 py-2.5 bg-stone-200 text-stone-900 rounded-xl text-sm font-semibold hover:bg-stone-300 transition-all"
                >
                  Cancel
                </motion.button>
              )}
            </motion.div>
          </motion.div>

          {/* Right Side - Products Grid */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold text-stone-900"
              >
                📦 All Products
              </motion.h2>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-amber-100 text-amber-800 text-sm font-bold px-4 py-2 rounded-full"
              >
                {products.length} total
              </motion.span>
            </div>

            {loading ? (
              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div key={i} variants={itemVariants} className="bg-white rounded-2xl border border-stone-100 overflow-hidden animate-pulse">
                    <div className="h-40 bg-gradient-to-r from-stone-100 to-stone-50" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-stone-100 rounded w-1/2" />
                      <div className="h-4 bg-stone-100 rounded" />
                      <div className="h-3 bg-stone-100 rounded w-2/3" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : products.length === 0 ? (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-stone-200"
              >
                <div className="text-6xl mb-3">📭</div>
                <p className="text-stone-400 font-medium">No products yet. Add your first one!</p>
              </motion.div>
            ) : (
              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                  <motion.div
                    key={p._id}
                    variants={productVariants}
                    whileHover="hover"
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
                  >
                    <div className="h-40 bg-gradient-to-br from-amber-50 to-stone-50 overflow-hidden relative">
                      <motion.img
                        src={p.images?.[0] || p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentNode.innerHTML = "<div class='w-full h-full flex items-center justify-center text-5xl'>🪑</div>";
                        }}
                      />
                      {p.discountPrice && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full"
                        >
                          {Math.round(((p.price - p.discountPrice) / p.price) * 100)}% OFF
                        </motion.span>
                      )}
                    </div>

                    <div className="p-4">
                      <span className="text-xs text-amber-700 font-bold bg-amber-100 px-2.5 py-1 rounded-full inline-block uppercase tracking-wider">
                        {p.category || "Furniture"}
                      </span>
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm font-bold text-stone-900 mt-2 truncate"
                      >
                        {p.name}
                      </motion.h3>

                      <div className="flex items-baseline gap-2 mt-2 mb-3">
                        <span className="text-lg font-bold text-stone-900">
                          ₹{Number(p.discountPrice || p.price).toLocaleString("en-IN")}
                        </span>
                        {p.discountPrice && (
                          <span className="text-sm text-stone-400 line-through">
                            ₹{Number(p.price).toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setEditId(p._id);
                            setData({
                              name: p.name,
                              price: p.price,
                              discountPrice: p.discountPrice || "",
                              category: p.category || "",
                              brand: p.brand || "",
                              stock: p.stock || "",
                              material: p.material || "",
                              color: p.color || "",
                              dimensions: p.dimensions || "",
                              warranty: p.warranty || "",
                              deliveryTime: p.deliveryTime || "",
                              description: p.description || "",
                            });
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="flex-1 py-2 text-blue-600 border-2 border-blue-300 rounded-lg text-xs font-bold hover:bg-blue-50 transition-all"
                        >
                          ✏️ Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(p._id)}
                          className="flex-1 py-2 text-red-600 border-2 border-red-300 rounded-lg text-xs font-bold hover:bg-red-50 transition-all"
                        >
                          🗑️ Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}