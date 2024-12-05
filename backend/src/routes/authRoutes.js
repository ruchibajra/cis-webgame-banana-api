const express = require("express");
const AuthMiddleware = require("../middleware/authMiddleware");
const UserController = require("../controllers/authControllers");
const User = require("../models/authUserModel");
const AuthUtils = require("../utils/authUtils");

const userController = new UserController(User, AuthUtils);
const authMiddleware = new AuthMiddleware(AuthUtils);

const router = express.Router();

router.post("/register", (req, res) => userController.registerUser(req, res));
router.post("/login", (req, res) => userController.loginUser(req, res));
router.get(
  "/auth-user",
  (req, res, next) => authMiddleware.auth(req, res, next),
  (req, res) => {
    res.status(200).send({ ok: true });
  }
);

module.exports = router;
