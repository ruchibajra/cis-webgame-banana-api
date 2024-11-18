const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

class AuthMiddleware {
  static auth(req, res, next) {
    // Check if Authorization header is present
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Extract token from Authorization header
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user; // Attach user details to req.user
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  }
}

module.exports = AuthMiddleware;
