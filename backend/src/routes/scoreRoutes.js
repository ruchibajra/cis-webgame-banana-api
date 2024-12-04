// routes/scoreRoutes.js
const express = require("express");
const router = express.Router();
const {
  createOrUpdateScore,
  getScore,
  getLeaderboard,
} = require("../controllers/scoreController");

// POST route to create or update score
router.post("/", createOrUpdateScore);
router.get("/board", getLeaderboard);
router.get("/:userId", getScore); // Route to fetch user score

module.exports = router;
