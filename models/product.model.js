const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, enum: ["Men", "Women", "Kids"], required: true },
    size: { type: String, enum: ["S", "M", "L", "XL"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
