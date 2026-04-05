import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "general",
    },

    brand: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],

    stock: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    material: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    dimensions: {
      type: String,
      default: "",
    },

    warranty: {
      type: String,
      default: "",
    },

    deliveryTime: {
      type: String,
      default: "3-5 days",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);