const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, Array },
    price: { type: Number, required: true },
    color: { type: String },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
