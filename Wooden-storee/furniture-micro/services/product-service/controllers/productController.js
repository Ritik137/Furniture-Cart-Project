import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// ➕ Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({ msg: "Name and price are required" });
    }

    let imageUrl = "";

    // Upload image if provided
    if (req.file) {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "furniture" },
        async (error, result) => {
          if (error) return res.status(500).json({ msg: "Image upload failed" });

          imageUrl = result.secure_url;
          await saveProduct();
        }
      );
      stream.end(req.file.buffer);
    } else {
      await saveProduct();
    }

    async function saveProduct() {
      const product = await Product.create({
        name,
        price,
        description,
        category,
        image: imageUrl,
        createdBy: req.user?.userId,
      });

      res.status(201).json({ msg: "Product created successfully", product });
    }
  } catch (error) {
    console.error("Add Product Error ❌:", error);
    res.status(500).json({ msg: "Failed to create product", error: error.message });
  }
};

// 📖 Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch products" });
  }
};

// 📖 Get Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch product" });
  }
};

// ✏️ Update Product
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    let imageUrl = req.body.image;

    if (req.file) {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "furniture" },
        async (error, result) => {
          if (error) return res.status(500).json({ msg: "Image upload failed" });

          imageUrl = result.secure_url;
          await saveUpdate();
        }
      );
      stream.end(req.file.buffer);
    } else {
      await saveUpdate();
    }

    async function saveUpdate() {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { name, price, description, category, image: imageUrl },
        { new: true }
      );
      res.json({ msg: "Product updated successfully", product });
    }
  } catch (error) {
    res.status(500).json({ msg: "Failed to update product" });
  }
};

// 🗑️ Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Failed to delete product" });
  }
};