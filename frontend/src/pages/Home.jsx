import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Home = () => {
  const email = localStorage.getItem("email");

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-yellow-200 to-green-300 text-gray-800 p-8 transition-all duration-500">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-12 px-6">
        <h1 className="text-5xl font-semibold text-yellow-600 tracking-wide">
          🍌 Banana Game 🍌
        </h1>

        {/* Email and Logout Button */}
        <div className="flex items-center space-x-6">
          <p className="text-lg text-gray-700">{email || "Guest"}</p>
          <Link
            to="/login"
            className="bg-transparent border-2 border-gray-700 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300"
          >
            <i className="fas fa-sign-out-alt mr-2"></i> Logout
          </Link>
        </div>
      </header>
      {/* Main Content */}
      <div className="text-center mb-8 w-full max-w-lg">
        <p className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome, {email || "Guest"}!
        </p>
        <p className="text-xl opacity-80 text-gray-600 mb-8">
          Prepare for a fun, fruity adventure! 🍌🎮
        </p>
      </div>
      {/* Profile and Leadership Buttons */}
      <div className="flex flex-col items-center space-y-4 mb-12">
        <Link to="/profile">
          <button className="relative flex items-center justify-center w-[340px] bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-full font-semibold shadow-lg transition duration-300 transform hover:scale-105 hover:from-yellow-600 hover:to-yellow-700">
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-50 rounded-full blur-lg"></span>
            <span className="relative">Profile</span>
          </button>
        </Link>
        <Link to="/leadership">
          <button className="relative flex items-center justify-center w-[340px] bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-full font-semibold shadow-lg transition duration-300 transform hover:scale-105 hover:from-green-600 hover:to-green-700">
            <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-50 rounded-full blur-lg"></span>
            <span className="relative">Leadership</span>
          </button>
        </Link>
      </div>
      {/* Start Gme Buttons */}
      <div className="flex justify-center mt-8 mb-12">
        <Link
          to="/game"
          className="bg-gradient-to-r from-yellow-400 to-green-500 text-white font-semibold py-4 px-12 rounded-full shadow-lg hover:scale-105 transition duration-300"
        >
          <i className="fas fa-play mr-3"></i> Start Game
        </Link>
      </div>
      {/* Footer */}
      <footer className="absolute bottom-4 w-full text-center text-gray-600 opacity-70">
        <p>&copy; 2024 Banana Game. All rights reserved.</p>
      </footer>
      {/* Floating Banana Leaf Icon */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="fas fa-leaf text-4xl text-green-600"></i>
      </div>
    </div>
  );
};

export default Home;
