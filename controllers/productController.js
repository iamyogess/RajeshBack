const ProductModel = require("../model/Product");

//add product
const addProduct = async (req, res) => {
  const newProductData = req.body;
  try {
    const newProduct = new ProductModel(newProductData);
    const savedProduct = await newProduct.save();
    res
      .status(200)
      .json({ message: "Product Added Successfully!", savedProduct });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Product Updated Successfully!", updatedProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const allProducts = await ProductModel.find();
    if (!allProducts || allProducts.length === 0) {
      res.status(404).json({ message: "No products not found!" });
    } else {
      res.status(200).json({ allProducts });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const deleteProduct = async (req, res) => {
  const productID = req.params.id;
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productID);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found or already deleted" });
    }
    res
      .status(200)
      .json({ message: "Product Deleted Successfully!", deletedProduct });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error deleting product from the database",
        details: error.message,
      });
  }
};

module.exports = { getAllProduct, updateProduct, addProduct,deleteProduct };
