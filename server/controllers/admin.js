const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  let token = req.headers.authorization

  if (token && token.startsWith("Bearer")){
    token = token.substring(7, token.length);
    try {
      req.user =  jwt.verify(token, config.jwtSecret);
      if (!req.user.admin) return unauthorized(res);
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
