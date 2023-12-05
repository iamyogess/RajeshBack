const express = require("express");
const router = express.Router();

const {
  getAllCart,
  updateCart,
  addCart,
  deleteCart,
  getCart,
} = require("../controllers/cartController");
const verifyRegistredUser = require("../middlewares/verifyRegistredUser");

// protected route
router.post("/add-carts", verifyRegistredUser);
router.get("/get-carts", verifyRegistredUser);
router.put("/update-carts/:id", verifyRegistredUser);
router.delete("/:id", verifyRegistredUser);
router.get("/find/:userID", verifyRegistredUser);//userid

//routes
router.post("/add-carts", addCart);
router.get("/get-carts", getAllCart);
router.put("/update-carts/:id", updateCart);
router.delete("/:id", deleteCart);
router.get("/find/:userID", getCart);//useid

module.exports = router;
