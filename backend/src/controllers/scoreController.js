// controllers/scoreController.js
const Score = require("../models/scoreModel");

// Controller to create or update score
const createOrUpdateScore = async (req, res) => {
  try {
    const { userId, score } = req.body;

    if (!userId || score === undefined) {
      return res.status(400).json({ message: "userId and score are required" });
    }

    let existingScore = await Score.findOne({ userId });
    if (existingScore) {
      existingScore.lastScore = score;
      if (score > existingScore.highScore) {
        existingScore.highScore = score;
      }
      await existingScore.save();
      return res.status(200).json({message: "Score updated successfully",lastScore: existingScore.lastScore, highScore: existingScore.highScore,});
    } else {
      const newScore = new Score({userId, lastScore: score, highScore: score,});
      await newScore.save();
      return res.status(201).json({message: "Score created successfully", lastScore: newScore.lastScore, highScore: newScore.highScore,});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Responsible to fetch the score data of the user
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

// Handles retrieving leaderboard data
const getLeaderboardDetails = async (req, res) => {
  try {
    const leaderboard = await Score.aggregate([
      // Sort by highScore in descending order
      { $sort: { highScore: -1 } },

      { $limit: 100 },

      // join with User collection
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },

      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $project: {
          username: {
            $ifNull: ["$userDetails.username", "Unknown Player"],
          },
          highScore: 1,
          userId: 1,
        },
      },
    ]);
    console.log(
      "Leaderboard Query Result:",
      JSON.stringify(leaderboard, null, 2)
    );

    if (leaderboard.length === 0) {
      return res.status(404).json({
        message: "No scores found",
        details: "Leaderboard query returned empty result",
      });
    }

    return res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Leaderboard Error:", error);
    return res.status(500).json({
      message: "Server error retrieving leaderboard",
      error: error.message,
    });
  }
};

module.exports = {
  createOrUpdateScore,
  getScore,
  getLeaderboardDetails,
};
