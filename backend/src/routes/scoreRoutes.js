// routes/scoreRoutes.js
const express = require("express");
const router = express.Router();
const {
  createOrUpdateScore,
  getScore,
} = require("../controllers/scoreController");

// POST route to create or update score
router.post("/", createOrUpdateScore);
router.get("/:userId", getScore); // Route to fetch user score

module.exports = router;
