const Product = require("../models/Product");

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { productId, name, amount, price, brand } = req.body;
    const image = req.file ? req.file.path : null; // save uploaded file path
    const product = await Product.create({
      productId,
      name,
      image,
      amount,
      price,
      brand,
      createdBy: req.user.userId,
    });
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  const products = await Product.find().populate("createdBy", "name email");
  res.json(products);
};

// Get single product
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== "admin" && product.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    Object.assign(product, req.body);
    await product.save();
    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (req.user.role !== "admin" && product.createdBy.toString() !== req.user.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await product.remove();
  res.json({ message: "Product deleted" });
};
