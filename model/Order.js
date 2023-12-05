const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
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
    amount: { type: Number, required: true },
    address: [
      {
        district: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        nearby: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
