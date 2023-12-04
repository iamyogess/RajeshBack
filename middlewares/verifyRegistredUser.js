const jwt = require("jsonwebtoken");
const UserModel = require("../model/User");

const checkUserAuthentication = async (req, res) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      //get token from header
      token = authorization.split(" ")[1];
      //verify token
      const { userID } = jwt.verify(token, process.env.SECRET_JWT_KEY);
      //GET USER FROM TOKEN
      req.user = await UserModel.findById(userID).select("-password");
    } catch (error) {
      res.status(401).send({ status: "Failed", message: "Unauthorized User!" });
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: "Failed", message: "Unauthorized User, No token!" });
  }
};

module.exports = checkUserAuthentication;
