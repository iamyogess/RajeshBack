const CartModel = require("../model/Cart");

//add cart
const addCart = async (req, res) => {
  const newCartData = req.body;
  try {
    const newCart = new CartModel(newCartData);
    const savedCart = await newCart.save();
    res.status(200).json({ message: "Cart Added Successfully!", savedCart });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCart = async (req, res) => {
  try {
    const updatedCart = await CartModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Cart Updated Successfully!", updatedCart });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllCart = async (req, res) => {
  try {
    const allCart = await CartModel.find();
    if (!allCart || allCart.length === 0) {
      res.status(404).json({ message: "No carts not found!" });
    } else {
      res.status(200).json({ allCart });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ userID: req.params.userID });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteCart = async (req, res) => {
  const cartID = req.params.id;
  try {
    const deletedCart = await CartModel.findByIdAndDelete(cartID);
    if (!deletedCart) {
      return res
        .status(404)
        .json({ message: "Cart not found or already deleted" });
    }
    res
      .status(200)
      .json({ message: "Cart Deleted Successfully!", deletedCart });
  } catch (error) {
    res.status(500).json({
      error: "Error deleting Cart from the database",
      details: error.message,
    });
  }
};

module.exports = { getAllCart, updateCart, addCart, deleteCart, getCart };
