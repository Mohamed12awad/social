const jwt = require("jsonwebtoken");
const config = require("../config");

exports.authMiddleware = async (req, res, next) => {
  let token = req.cookies.token || req.header("Authorization");
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token." });
      } else {
        // console.log("cookie", req.cookies.token);
        // console.log("Authorization", req.header("Authorization"));
        req.user = decodedToken;
        next();
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
};
