import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaTrophy, FaStar, FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const [lastScore, setLastScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("userDetails")) || {
    username: "Guest",
    email: "guest@example.com",
    _id: null,
  };
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const fetchScores = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/score/${user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLastScore(response.data.lastScore || 0);
      setHighScore(response.data.highScore || 0);
    } catch (error) {
      console.error("Error fetching scores:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user._id && token) {
      fetchScores();
    } else {
      console.warn("User not authenticated or missing token.");
    }
  }, [user._id, token]);

  const handleBack = () => {
    navigate("/home");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-200 to-green-300">
        <p className="text-3xl font-semibold text-gray-800">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-yellow-50">
      {/* Header */}
      <header className="bg-yellow-600 p-4 text-white text-center w-full shadow-md">
        <h1 className="text-4xl font-bold">🍌 Banana Game Profile 🍌</h1>
      </header>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 p-2 bg-white rounded-full text-gray-600 hover:bg-yellow-400 transition duration-300"
      >
        <FaArrowLeft className="text-xl" />
      </button>

      {/* Profile Card */}
      <div className="flex justify-center items-center flex-1 p-6">
        <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-xl">
          {/* Profile Image and Information */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-yellow-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg mb-4">
              {user.username[0].toUpperCase()}
            </div>
            <h2 className="text-4xl font-semibold text-gray-800 mb-2">
              Hello, {user.username}!
            </h2>
            <div className="flex items-center mb-6">
              <FaEnvelope className="text-yellow-700 mr-2 text-xl" />
              <p className="text-lg text-gray-700">{user.email}</p>
            </div>
          </div>

          {/* Score Information */}
          <div className="flex justify-between space-x-4 mb-6">
            <div className="flex-1 bg-yellow-100 p-4 rounded-lg text-center shadow-md">
              <FaStar className="text-yellow-500 text-3xl mb-2" />
              <p className="text-lg text-gray-700">Last Score</p>
              <p className="text-2xl font-semibold text-yellow-500">
                {lastScore}
              </p>
            </div>
            <div className="flex-1 bg-yellow-100 p-4 rounded-lg text-center shadow-md">
              <FaTrophy className="text-yellow-600 text-3xl mb-2" />
              <p className="text-lg text-gray-700">High Score</p>
              <p className="text-2xl font-semibold text-yellow-600">
                {highScore}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 bg-yellow-600 text-center text-white shadow-md">
        <p>© 2024 Banana Game. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;
