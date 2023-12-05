const express = require("express");
const router = express.Router();
const verifyAdminAuthentication = require("../middlewares/verifyAdmin");
const {
  addProduct,
  updateProduct,
  getAllProduct,
  deleteProduct,
  getProduct
} = require("../controllers/productController");

//admin verification using middlewares
router.post("/add-product", verifyAdminAuthentication);
router.put("/update-product/:id", verifyAdminAuthentication);
router.delete("/:id", verifyAdminAuthentication);

// protected route
router.post("/add-product", addProduct);
router.put("/update-product/:id", updateProduct);
router.get("/getallproduct", getAllProduct);
router.get("/find/:id", getProduct);
router.delete("/:id", deleteProduct);
module.exports = router;
