const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//registration

const userRegistration = async (req, res) => {
  try {
    const { firstName, lastName, phoneNo, isAdmin, password, confirmPassword } =
      req.body;
    if (firstName && lastName && phoneNo && password && confirmPassword) {
      const existingUser = await UserModel.findOne({ phoneNo: phoneNo });
      if (existingUser) {
        res.status(409).json({
          message: "A user with the provided phoneNo address already exists.",
        });
      } else {
        if (password === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const newUser = new UserModel({
            firstName: firstName,
            lastName: lastName,
            phoneNo: phoneNo,
            isAdmin: isAdmin,
            password: hashedPassword,
          });
          await newUser.save();
          //generate token
          const savedUser = await UserModel.findOne({ phoneNo: phoneNo });
          const token = jwt.sign(
            { userID: savedUser._id },
            process.env.SECRET_JWT_KEY,
            { expiresIn: "5d" }
          );
          res
            .status(201)
            .json({ message: "Registration success!", token: token });
        } else {
          res.status(422).json({
            message: "The provided password and confirm password do not match.",
          });
        }
      }
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

//user login
const userLogin = async (req, res) => {
  try {
    const { phoneNo, password } = req.body;
    if (phoneNo && password) {
      const user = await UserModel.findOne({ phoneNo: phoneNo });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.phoneNo === phoneNo && isMatch) {
          // Generate JWT Token
          const token = jwt.sign(
            { userID: user._id },
            process.env.SECRET_JWT_KEY,
            { expiresIn: "5d" }
          );
          res.send({
            status: "success",
            message: "Login Success",
            token: token,
          });
        } else {
          res.send({
            status: "failed",
            message: "Email or Password is not Valid",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "You are not a Registered User",
        });
      }
    } else {
      res.send({ status: "failed", message: "All Fields are Required" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: "failed", message: "Unable to Login" });
  }
};

module.exports = { userRegistration, userLogin };
