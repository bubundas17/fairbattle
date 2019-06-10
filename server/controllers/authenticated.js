const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User")

module.exports = (req, res, next) => {
  let token = req.headers.authorization

  if (token && token.startsWith("Bearer")){
    token = token.substring(7, token.length);
    try {
      req.user =  jwt.verify(token, config.jwtSecret);
      req.userDoc = () => {
        return User.findById(req.user.id).select("-password")
      }
    } catch (err) {
      return unauthorized(res)
    }
    next()
  } else {
    return unauthorized(res);
  }
};


function unauthorized(res) {
  res.status(401).json({message: "Unauthorized"})
}
