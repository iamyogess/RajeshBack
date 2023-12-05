const express = require("express");
const router = express.Router();

const {
  getAllCart,
  updateCart,
  addCart,
  deleteCart,
} = require("../controllers/cartController");
const verifyRegistredUser = require("../middlewares/verifyRegistredUser");

// protected route
router.post("/add-carts", verifyRegistredUser);
router.get("/get-carts", verifyRegistredUser);
router.put("/update-carts/:id", verifyRegistredUser);
router.delete("/:id", verifyRegistredUser);

//routes
router.post("/add-carts", addCart);
router.get("/get-carts", getAllCart);
router.put("/update-carts/:id", updateCart);
router.delete("/:id", deleteCart);

module.exports = router;
