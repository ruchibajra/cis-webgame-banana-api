import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const validationErrors = {};
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";
    setError(validationErrors);
    return validationErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate form inputs
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login", // Replace with your login API endpoint
        { email, password }
      );

      const { token, user } = response.data;

      // Store the token
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);

      toast.success("Login successful!");

      // Redirect to the home page after successful login
      navigate("/home");
    } catch (error) {
      console.error(error.response?.data?.msg || error.message);
      toast.error(
        error.response?.data?.msg || "Login failed, please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-bold mb-6 text-center text-yellow-700">
          Banana Game Login 🍌
        </h2>
        <p className="text-center text-lg text-yellow-600 mb-6">
          Ready to peel your way to victory? Let's get started!
        </p>
        <form onSubmit={handleLogin}>
          <ToastContainer />
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              <i className="fas fa-user mr-2"></i> Email
            </label>
            <input
              type="text"
              id="email"
              className={`w-full px-4 py-3 border ${
                error.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error.email && (
              <div className="text-red-500 text-sm">{error.email}</div>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              <i className="fas fa-lock mr-2"></i> Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-3 border ${
                error.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error.password && (
              <div className="text-red-500 text-sm">{error.password}</div>
            )}
          </div>

          <div className="flex items-center justify-between mb-6">
            <button
              type="submit"
              className="bg-yellow-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
            >
              <i className="fas fa-play-circle mr-2"></i> Start Playing
            </button>
          </div>

          <div className="flex justify-between items-center text-sm mb-4">
            <Link
              to="/forgot-password"
              className="text-yellow-600 hover:text-yellow-800 font-semibold"
            >
              Forgot Password?
            </Link>
            <p>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-yellow-600 hover:text-yellow-800 font-semibold"
              >
                Register
              </Link>
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              By logging in, you agree to our{" "}
              <Link
                to="/terms"
                className="text-yellow-600 hover:text-yellow-800 font-semibold"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-yellow-600 hover:text-yellow-800 font-semibold"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
