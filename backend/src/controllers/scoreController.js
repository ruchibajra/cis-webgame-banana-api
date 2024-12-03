// controllers/scoreController.js
const Score = require("../models/scoreModel");

// Controller to create or update score
const createOrUpdateScore = async (req, res) => {
  try {
    const { userId, score } = req.body;

    // Ensure userId and score are provided
    if (!userId || score === undefined) {
      return res.status(400).json({ message: "userId and score are required" });
    }

    // Find if a score record already exists for the user
    let existingScore = await Score.findOne({ userId });

    if (existingScore) {
      // Update lastScore and highScore
      existingScore.lastScore = score;
      if (score > existingScore.highScore) {
        existingScore.highScore = score;
      }
      await existingScore.save();
      return res.status(200).json({
        message: "Score updated successfully",
        lastScore: existingScore.lastScore,
        highScore: existingScore.highScore,
      });
    } else {
      // Create new record with lastScore and highScore set to the new score
      const newScore = new Score({
        userId,
        lastScore: score,
        highScore: score,
      });
      await newScore.save();
      return res.status(201).json({
        message: "Score created successfully",
        lastScore: newScore.lastScore,
        highScore: newScore.highScore,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getScore = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const score = await Score.findOne({ userId });

    if (!score) {
      return res.status(404).json({ message: "Score not found for the user" });
    }

    return res.status(200).json(score);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrUpdateScore,
  getScore,
};
