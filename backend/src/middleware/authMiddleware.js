const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

class AuthMiddleware {
  constructor(authUtils) {
    this.authUtils = authUtils;
  }

  auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
      const decoded = this.authUtils.verifyToken(token);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  }
}

module.exports = AuthMiddleware;
