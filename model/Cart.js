const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true, unique: true },
    products: [
      {
        productID: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;
