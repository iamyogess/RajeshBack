const OrderModel = require("../model/Order");

//add Order
const addOrder = async (req, res) => {
  const newOrderData = req.body;
  try {
    const newOrder = new OrderModel(newOrderData);
    const savedOrder = await newOrder.save();
    res.status(200).json({ message: "Order Added Successfully!", savedOrder });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Order Updated Successfully!", updatedOrder });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const allOrder = await OrderModel.find();
    if (!allOrder || allOrder.length === 0) {
      res.status(404).json({ message: "Orders not found!" });
    } else {
      res.status(200).json({ allOrder });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await OrderModel.findOne({ userID: req.params.userID });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteOrder = async (req, res) => {
  const OrderID = req.params.id;
  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(OrderID);
    if (!deletedOrder) {
      return res
        .status(404)
        .json({ message: "Order not found or already deleted" });
    }
    res
      .status(200)
      .json({ message: "Order Deleted Successfully!", deletedOrder });
  } catch (error) {
    res.status(500).json({
      error: "Error deleting Order from the database",
      details: error.message,
    });
  }
};

// GET MONTHLY INCOME

module.exports = { getAllOrder, updateOrder, addOrder, deleteOrder, getOrder };
