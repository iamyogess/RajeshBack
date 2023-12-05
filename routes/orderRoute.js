const express = require("express");
const router = express.Router();

const {
  getAllOrder,
  updateOrder,
  addOrder,
  deleteOrder,
  getOrder,
} = require("../controllers/cartController");
const verifyRegistredUser = require("../middlewares/verifyRegistredUser");

// protected route
router.post("/add-order", verifyRegistredUser);
router.get("/get-order", verifyRegistredUser);
router.put("/update-order/:id", verifyRegistredUser);
router.delete("/:id", verifyRegistredUser);
router.get("/find/:userID", verifyRegistredUser); //userid

//routes
router.post("/add-order", addOrder);
router.get("/get-order", getAllOrder);
router.put("/update-order/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/find/:userID", getOrder); //userid

module.exports = router;
