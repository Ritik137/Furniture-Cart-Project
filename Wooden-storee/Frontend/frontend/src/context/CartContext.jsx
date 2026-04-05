import { createContext, useState } from "react";
import { useEffect } from "react";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
});

  // ✅ Add
 const addToCart = (item) => {
  const newItem = {
    ...item,
    cartId: Date.now() + Math.random() // 🔥 unique id
  };

  setCart(prev => [...prev, newItem]);
};

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);  

 const removeFromCart = (cartId) => {
  setCart(prev => prev.filter(item => item.cartId !== cartId));
};

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};