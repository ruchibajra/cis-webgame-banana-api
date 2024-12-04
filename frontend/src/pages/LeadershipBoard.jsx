import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/score/board"
        );
        setLeaderboard(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-yellow-50">
      <header className="bg-yellow-600 p-4 text-white text-center">
        <h1 className="text-4xl font-bold">🍌 Banana Game Leaderboard 🍌</h1>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-yellow-700">
            Top Players
          </h2>
          <table className="min-w-full bg-white border border-yellow-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-yellow-300">
                <th className="py-3 px-6 border-b">Rank</th>
                <th className="py-3 px-6 border-b">Username</th>
                <th className="py-3 px-6 border-b">High Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr
                  key={user.userId}
                  className="text-center odd:bg-yellow-200 even:bg-yellow-100"
                >
                  <td className="py-3 px-6 border-b">{index + 1}</td>
                  <td className="py-3 px-6 border-b">{user.username}</td>
                  <td className="py-3 px-6 border-b">{user.highScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="bg-yellow-600 p-4 text-white text-center">
        <p>© 2024 Banana Game. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Leaderboard;
