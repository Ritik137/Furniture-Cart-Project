import { useEffect, useState } from "react";
import { productAPI } from "../utils/api";

export default function Admin() {
  if (localStorage.getItem("role") !== "admin") {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-4">
        <div className="text-6xl">🔒</div>
        <h2 className="text-2xl text-stone-900">Access denied</h2>
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
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await productAPI.get("/getall");
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    if (!data.name || !data.price) return alert("Required fields missing");

    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
    if (file) formData.append("image", file);

    await productAPI.post("/add", formData);

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
  };

  const handleDelete = async (id) => {
    await productAPI.delete(`/delete/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>

      {/* FORM */}
         <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          "name",
          "price",
          "discountPrice",
          "category",
          "brand",
          "stock",
          "material",
          "color",
          "dimensions",
          "warranty",
          "deliveryTime",
        ].map((field) => (
          <input
            key={field}
            placeholder={field}
            value={data[field]}
            onChange={(e) => setData({ ...data, [field]: e.target.value })}
            className="border p-2 rounded"
          />
        ))}

        <textarea
          placeholder="description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="border p-2 rounded col-span-2"
        />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button
          onClick={handleSubmit}
          className="bg-black text-white p-2 rounded col-span-2"
        >
          Add Product
        </button>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border p-3 rounded">
            <img src={p.images?.[0]} className="h-32 w-full object-cover" />

            <h2 className="font-bold">{p.name}</h2>

            <p>
              ₹{p.discountPrice || p.price}
              {p.discountPrice && (
                <span className="line-through ml-2 text-gray-400">
                  ₹{p.price}
                </span>
              )}
            </p>

            <p className="text-sm text-green-600">
              {p.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            <p className="text-xs">🚚 {p.deliveryTime}</p>

            <button
              onClick={() => handleDelete(p._id)}
              className="text-red-500 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
