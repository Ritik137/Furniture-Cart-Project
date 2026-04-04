import { useEffect, useState, useContext } from "react";
import { productAPI } from "../utils/api";
import { CartContext } from "../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    productAPI
      .get("/getall")
      .then((res) => {
        console.log("API DATA:", res.data);

        // safe handling (important)
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Explore Furniture 🪑
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img src={p.image} className="h-56 w-full object-cover" />

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                <h2 className="text-xl font-semibold text-gray-800">
                  {p.name}
                </h2>

                <p className="text-gray-500 mt-1">₹{p.price}</p>

                <p className="text-sm text-gray-400 mt-2">{p.description}</p>
              </h2>

              <button
                onClick={() => addToCart(p)}
                className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* empty state */}
      {products.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No products found 😢</p>
      )}
    </div>
  );
}
