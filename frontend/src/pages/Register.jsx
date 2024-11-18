import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const validationErrors = {};
    if (!username) validationErrors.username = "Username is required";
    if (!email) validationErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      validationErrors.email = "Email is invalid";
    if (!password) validationErrors.password = "Password is required";
    if (password.length < 6)
      validationErrors.password = "Password must be at least 6 characters long";
    if (password !== confirmPassword)
      validationErrors.confirmPassword = "Passwords do not match";

    setError(validationErrors);
    return validationErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Validate form inputs
    const validationErrors = validate();

    // Only proceed if no validation errors
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/register",
          {
            username,
            email,
            password,
            confirmPassword,
          }
        );
        console.log(response); // Log the response for debugging
        toast.success("Registration successful");

        // Clear form fields
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // Redirect to login page after a delay
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Delay navigation by 2 seconds
      } catch (error) {
        console.error(error.response.data.msg); // Log error to console
        toast.error(error.response.data.msg); // Show error notification
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600">
      <div className="relative bg-white p-8 rounded-3xl shadow-lg w-full max-w-lg">
        {/* Banana Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat rounded-3xl opacity-20"
          style={{
            backgroundImage: 'url("https://www.example.com/banana-image.jpg")',
          }}
        ></div>
        <h2 className="text-4xl font-extrabold text-yellow-600 text-center mb-6 relative z-10">
          🍌 Banana Game Registration 🍌
        </h2>

        <form onSubmit={handleRegister}>
          <ToastContainer />
          <div className="mb-6 relative z-10">
            <label
              className="block text-gray-800 text-xl font-bold mb-2"
              htmlFor="username"
            >
              <i className="fas fa-user mr-3 text-yellow-600"></i> Username
            </label>
            <input
              type="text"
              id="username"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                error.username ? "border-red-500" : "border-yellow-500"
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {error.username && (
              <div className="text-red-500 text-sm mt-1">{error.username}</div>
            )}
          </div>

          <div className="mb-6 relative z-10">
            <label
              className="block text-gray-800 text-xl font-bold mb-2"
              htmlFor="email"
            >
              <i className="fas fa-envelope mr-3 text-yellow-600"></i> Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                error.email ? "border-red-500" : "border-yellow-500"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error.email && (
              <div className="text-red-500 text-sm mt-1">{error.email}</div>
            )}
          </div>

          <div className="mb-6 relative z-10">
            <label
              className="block text-gray-800 text-xl font-bold mb-2"
              htmlFor="password"
            >
              <i className="fas fa-lock mr-3 text-yellow-600"></i> Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                error.password ? "border-red-500" : "border-yellow-500"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error.password && (
              <div className="text-red-500 text-sm mt-1">{error.password}</div>
            )}
          </div>

          <div className="mb-6 relative z-10">
            <label
              className="block text-gray-800 text-xl font-bold mb-2"
              htmlFor="confirmPassword"
            >
              <i className="fas fa-lock mr-3 text-yellow-600"></i> Confirm
              Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                error.confirmPassword ? "border-red-500" : "border-yellow-500"
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">
                {error.confirmPassword}
              </div>
            )}
          </div>

          <div className="flex justify-center mb-6">
            <button
              type="submit"
              className="w-3/4 bg-yellow-600 text-white text-xl font-bold py-3 rounded-lg hover:bg-yellow-700 transition duration-300 ease-in-out"
            >
              <i className="fas fa-user-plus mr-2"></i> Register
            </button>
          </div>

          <div className="text-center relative z-10">
            <p className="text-lg">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-yellow-600 hover:text-yellow-700 font-semibold"
              >
                Login Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
