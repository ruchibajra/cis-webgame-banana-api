// import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Home = () => {
  const [showQuitConfirmation, setShowQuitConfirmation] = useState(false); // State to control quit confirmation popup
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const confirmLogout = () => {
    // Navigate to the login page when confirmed
    localStorage.removeItem("email"); // Clear the email from localStorage
    navigate("/login"); // Navigate to login page
  };

  const cancelQuit = () => {
    // Hide the quit confirmation popup
    setShowQuitConfirmation(false);
  };

  const handleLogoutClick = () => {
    // Show confirmation popup
    setShowQuitConfirmation(true);
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-yellow-200 to-green-300 text-gray-800 p-8 transition-all duration-500">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-12 px-6">
        <h1 className="text-5xl font-semibold text-yellow-600 tracking-wide">
          🍌 Banana Game 🍌
        </h1>

        {/* Email and Logout Button */}
        <div className="flex items-center space-x-6">
          <p className="text-lg text-gray-700">{email || "Guest"}</p>
          <button
            onClick={handleLogoutClick}
            className="bg-transparent border-2 border-gray-700 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300"
          >
            <i className="fas fa-sign-out-alt mr-2"></i> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="text-center mb-8 w-full max-w-lg">
          <p className="text-3xl font-semibold text-gray-800 mb-4">
            LET'S PLAY!
          </p>
          <p className="text-xl opacity-80 text-gray-600 mb-8">
            Prepare for a fun, fruity adventure! 🍌🎮
          </p>
        </div>

        {/* Profile Page*/}
        <div className="flex flex-col items-center space-y-4">
          <Link to="/profile">
            <button className="relative flex items-center justify-center w-[340px] bg-gradient-to-r from-yellow-500
             to-yellow-600 text-white py-3 rounded-full font-semibold shadow-lg transition duration-300 transform hover:scale-105
              hover:from-yellow-600 hover:to-yellow-700">
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-50 rounded-full blur-lg"></span>
              <span className="relative">Profile</span>
            </button>
          </Link>

        {/* Leaderboard Page */}
          <Link to="/leadership">
            <button className="relative flex items-center justify-center w-[340px] bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-full font-semibold shadow-lg transition duration-300 transform hover:scale-105 hover:from-green-600 hover:to-green-700">
              <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-50 rounded-full blur-lg"></span>
              <span className="relative">Leaderboard</span>
            </button>
          </Link>
        </div>
        {/* Combined Banana Leaf Icon and Start Game Button */}
        <div className="flex flex-col items-center justify-center mt-8 mb-12 relative">
          {/* Floating Banana Leaf Icon */}
          <div className="absolute top-0 right-2 transform -translate-y-1/2 animate-bounce">
            <i className="fas fa-leaf text-4xl text-green-600"></i>
          </div>

          {/* Start Game Button */}
          <button
            onClick={() => navigate("/game")} // use navigate to redirect
            className="bg-gradient-to-r from-yellow-400 to-green-500 text-white font-semibold py-4 px-12
             rounded-full shadow-lg hover:scale-105 transition duration-300"
          >
            <i className="fas fa-play mr-3"></i> Start Game
          </button>
        </div>

        {/* Quit Confirmation Popup */}
        {showQuitConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg">
              <h2 className="text-3xl font-semibold text-yellow-700 mb-4">
                Are you sure you want to logout?
              </h2>
              <div className="flex justify-around">
                <button
                  onClick={confirmLogout}
                  className="w-1/3 bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-400 transform transition duration-200"
                >
                  Yes
                </button>
                <button
                  onClick={cancelQuit}
                  className="w-1/3 bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-400 transform transition duration-200"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="absolute bottom-4 w-full text-center text-gray-600 opacity-70">
          <p>&copy; 2024 Banana Game. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
export default Home;
