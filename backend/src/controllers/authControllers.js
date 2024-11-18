const User = require("../models/authUserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

class UserController {
  // Method for registering a new user
  static async registerUser(req, res) {
    const { username, email, password, confirmPassword } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        username,
        email,
        password,
        confirmPassword,
      });

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Generate JWT token and send the response
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            return res.status(500).json({ msg: "Error generating token" });
          }

          res.status(201).json({
            msg: "User registered successfully",
            token,
            userDetails: user,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }

  // Method for logging in a user
  static async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Generate JWT token and send the response
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            return res.status(500).json({ msg: "Error generating token" });
          }

          res.json({
            msg: "User login successful",
            token,
            userDetails: user,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
}

module.exports = UserController;
