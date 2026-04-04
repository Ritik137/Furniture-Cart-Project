// controllers/orderController.js
import Order from "../models/Order.js";

// 🛒 Create Order
export const createOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    const order = await Order.create({
      userId: req.user.id,
      products,
      totalAmount
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📜 Get My Orders (User)
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
};

// 👑 Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

// 🚚 Update Order Status (Admin)
export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(order);
};