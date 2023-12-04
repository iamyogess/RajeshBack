const express = require("express");

const {
  userRegistration,
  userLogin,
} = require("../controllers/userController");

const router = express.Router();

//public routes
router.post("/register", userRegistration);
router.post("/login", userLogin);

module.exports = router;
