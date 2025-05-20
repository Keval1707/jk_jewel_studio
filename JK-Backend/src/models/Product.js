const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true, sparse: true },
  name: { type: String, required: true},
  sku: { type: String, required: true, unique: true },
  desc: { type: String },
  price: { type: Number, required: true },
  discount: { type: String }, // Could be a string like "20%" or a number
  material: { type: String },
  stock: { type: Boolean, default: true },
  rating: { type: Number, min: 0, max: 5 },
  reviews: { type: Number },
  img: [{ type: String }], // Array of image URLs/paths
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);
