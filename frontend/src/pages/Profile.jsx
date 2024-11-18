import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const email = localStorage.getItem("email");
  

  const user = {
    username: "JohnDoe",
    bio: "A passionate developer who loves building amazing web apps.",
    profileImage: "https://via.placeholder.com/150", 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 py-10 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-xl w-full">
        <div className="flex justify-center mb-8">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-800">
            {user.username}
          </h2>
          <p className="text-gray-500 mt-4 text-lg">{user.bio}</p>
        </div>
        <div className="text-center mb-8">
          <p className="text-gray-700 mt-4 text-lg">Email: {email}</p>
        </div>
        <div className="flex justify-center mb-8">
          <Link
            to="/edit-profile"
            className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Edit Profile
          </Link>
        </div>
        <div className="text-center">
          <Link
            to="/home"
            className="text-red-500 font-semibold hover:text-red-700 transition duration-300"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
