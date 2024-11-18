const express = require("express");
const AuthMiddleware = require("../middleware/authMiddleware");
const UserController = require("../controllers/authControllers");
const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

// Protected route for authenticated users
router.get("/auth-user", AuthMiddleware.auth, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
