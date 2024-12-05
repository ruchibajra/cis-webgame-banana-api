const jwt = require("jsonwebtoken");

class AuthUtils {
  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = AuthUtils;
