import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaTrophy, FaStar, FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const [lastScore, setLastScore] = useState(0); // State for last score
  const [highScore, setHighScore] = useState(0); // State for high score
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const user = JSON.parse(localStorage.getItem("userDetails")) || {
    username: "Guest",
    email: "guest@example.com",
    _id: null,
  };
  const token = localStorage.getItem("token"); // Token from localStorage

  const navigate = useNavigate();

  // Fetch scores from the backend
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
  });

  // Handle back navigation
  const handleBack = () => {
    navigate("/home");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-300">
        <p className="text-2xl font-semibold text-gray-800">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-300 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-lg">
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition duration-300"
        >
          <FaArrowLeft className="text-2xl" />
        </button>

        <div className="flex justify-center mb-6">
          <div className="w-36 h-36 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-900 text-white flex items-center justify-center text-5xl font-bold">
            {user.username[0].toUpperCase()}
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4 tracking-wide">
          Welcome, {user.username}!
        </h1>

        <div className="border-t-2 border-gray-200 my-6"></div>

        <div className="flex items-center mb-4">
          <FaEnvelope className="text-gray-600 mr-3 text-2xl" />
          <p className="text-lg font-semibold text-gray-600">
            Email:{" "}
            <span className="text-gray-800 font-medium">{user.email}</span>
          </p>
        </div>

        <div className="flex justify-between mb-6">
          <div className="flex items-center">
            <FaStar className="text-green-600 mr-3 text-2xl" />
            <div>
              <p className="text-lg font-medium text-gray-700">Last Score:</p>
              <p className="text-2xl font-semibold text-green-600">
                {lastScore}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <FaTrophy className="text-red-600 mr-3 text-2xl" />
            <div>
              <p className="text-lg font-medium text-gray-700">High Score:</p>
              <p className="text-2xl font-semibold text-red-600">{highScore}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
