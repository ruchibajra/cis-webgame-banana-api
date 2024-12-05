  const User = require("../models/authUserModel");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  const dotenv = require("dotenv");

  dotenv.config();

  class UserController {
    constructor(userModel, authUtils) {
      this.User = userModel; // Injecting User model
      this.authUtils = authUtils; // Injecting AuthUtils
    }

    // Generate a token with the user ID as payload
    _generateToken(payload) {
      return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
    }

    // Register a new user
    async registerUser(req, res) {
      const { username, email, password, confirmPassword } = req.body;

      try {
        if (password !== confirmPassword) {
          return res.status(400).json({ msg: "Passwords do not match" });
        }

        const existingUser = await this.User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ msg: "User already exists" });
        }

        const newUser = new this.User({
          username,
          email,
          password,
          confirmPassword,
        });
        await newUser.save();

        const token = this._generateToken({ user: { id: newUser.id } });
        res.status(201).json({
          msg: "User registered successfully",
          token,
          userDetails: newUser,
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }

    // Log in a user
    async loginUser(req, res) {
      const { email, password } = req.body;

      try {
        const user = await this.User.findOne({ email });
        if (!user) {
          return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = this._generateToken({ user: { id: user.id } });

        res.json({
          msg: "User login successful",
          token,
          userDetails: user,
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  }

  module.exports = UserController;
