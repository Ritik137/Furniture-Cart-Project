import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty 😢</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex bg-white rounded-2xl shadow-md overflow-hidden"
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  className="w-40 h-40 object-cover"
                />

                {/* DETAILS */}
                <div className="p-4 flex flex-col justify-between w-full">
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500 mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <button
                    //   onClick={() => removeFromCart(item._id)}
                    onClick={() => removeFromCart(item.cartId)}
                      className="text-red-500 text-sm"
                    >
                      Remove ❌
                    </button>

                    <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                      Buy Now ⚡
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-10 bg-white p-6 rounded-xl shadow-md max-w-md ml-auto">
            <h2 className="text-xl font-bold mb-2">Total</h2>
            <p className="text-2xl font-semibold">₹{total}</p>

            <button className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800">
              Checkout 🛍️
            </button>
          </div>
        </>
      )}
    </div>
  );
}   