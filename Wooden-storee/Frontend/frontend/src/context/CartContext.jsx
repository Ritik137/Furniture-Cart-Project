import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Add
 const addToCart = (item) => {
  const newItem = {
    ...item,
    cartId: Date.now() + Math.random() // 🔥 unique id
  };

  setCart(prev => [...prev, newItem]);
};

  // ✅ REMOVE (🔥 ADD THIS)
 const removeFromCart = (cartId) => {
  setCart(prev => prev.filter(item => item.cartId !== cartId));
};

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};