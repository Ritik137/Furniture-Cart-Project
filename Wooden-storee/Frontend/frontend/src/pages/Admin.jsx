import { useEffect, useState } from "react";
import { productAPI } from "../utils/api";

export default function Admin() {

  // 🔐 Role check
  if (localStorage.getItem("role") !== "admin") {
    return <h1 className="p-6 text-red-500">Access Denied ❌</h1>;
  }

  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    category: ""
  });

  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);  

  // 🔥 Fetch products
  const fetchProducts = async () => {
    try {
      const res = await productAPI.get("/getall");  
      setProducts(res.data.products || res.data || []);  
    } catch (err) {
      console.error("Fetch error ❌:", err);
      setProducts([]); // ✅ fallback
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ➕ Add Product
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("category", data.category);

      if (file) {
        formData.append("image", file);
      }

      await productAPI.post("/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Product Added ✅");

      setData({
        name: "",
        price: "",
        description: "",
        category: ""
      });
      setFile(null);

      fetchProducts();

    } catch (err) {
      console.error("Add error ❌:", err);
      alert(err.response?.data?.msg || "Error ❌");
    }
  };

  // 🗑️ Delete Product
  const handleDelete = async (id) => {
    try {
      await productAPI.delete(`/${id}`); // ✅ FIXED route
      alert("Deleted ✅");
      fetchProducts();
    } catch (err) {
      console.error("Delete error ❌:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg mx-auto mb-10">
        <h1 className="text-2xl font-bold mb-6 text-center">
          👑 Add Product
        </h1>

        <input
          placeholder="Product Name"
          value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })}
          className="w-full p-3 border rounded mb-3"
        />

        <input
          placeholder="Price"
          value={data.price}
          onChange={e => setData({ ...data, price: e.target.value })}
          className="w-full p-3 border rounded mb-3"
        />

        <textarea
          placeholder="Description"
          value={data.description}
          onChange={e => setData({ ...data, description: e.target.value })}
          className="w-full p-3 border rounded mb-3"
        />

        <input
          placeholder="Category"
          value={data.category}
          onChange={e => setData({ ...data, category: e.target.value })}
          className="w-full p-3 border rounded mb-3"
        />

        {/* IMAGE UPLOAD */}
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            id="fileUpload"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />

          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-black"
          >
            {!file ? (
              <span className="text-gray-500">📸 Click to upload image</span>
            ) : (
              <img
                src={URL.createObjectURL(file)}
                className="h-full object-cover rounded"
              />
            )}
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Add Product 🚀
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map(p => (
            <div key={p._id} className="bg-white p-4 rounded-xl shadow">
              <img
                src={p.image}
                className="h-40 w-full object-cover mb-2 rounded"
              />
              <h2 className="font-bold">{p.name}</h2>
              <p className="text-gray-600">₹{p.price}</p>

              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
              >
                Delete ❌
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No products found 😅</p>
        )}
      </div>

    </div>
  );
}