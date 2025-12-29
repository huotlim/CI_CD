const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String },       // URL or file path
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  brand: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who created it
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
