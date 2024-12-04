// const Score = require("../models/scoreModel");

// // Controller to get the leaderboard
// const getLeaderboard = async (req, res) => {
//   try {
//     // Fetch all scores, sorted by highScore in descending order
//     const leaderboard = await Score.find()
//       .sort({ highScore: -1 }) // Sorting by highest score first
//       .limit(10); // Optionally limit the leaderboard to top 10 scores

//     // Check if the leaderboard has data
//     if (!leaderboard || leaderboard.length === 0) {
//       return res.status(404).json({ message: "No leaderboard data found" });
//     }

//     // Format the leaderboard data with userId and highScore
//     const leaderboardData = leaderboard.map((score, index) => ({
//       rank: index + 1, // Rank is the index + 1
//       userId: score.userId, // Show only userId
//       highScore: score.highScore, // Show highScore
//     }));

//     // Send the leaderboard data as a response
//     return res.status(200).json(leaderboardData);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = {
//   getLeaderboard,
// };
