// React
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
//context
import { useAuth } from "../contexts/AuthContext";

//Axios for data fetching
import axios from "axios";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigator = useNavigate();
  const handleButtonClick = () => {
    // Use navigate(-1) to navigate back
    navigator(-1);
  };

  // Check if the user is authenticated
  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // Call the logout function from the AuthContext
    logout();
  };

  const handleDeleteAccount = async () => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (isConfirmed) {
      try {
        // Make a DELETE request to the server to delete the user
        const response = await axios.delete(
          `http://localhost:3030/users/${user.id}`
        );

        if (response.status === 200) {
          // User deleted successfully

          // Remove user data from local storage
          localStorage.removeItem("user");

          // Redirect to the posts page or any other page
          window.location.href = "/posts";
        } else {
          // Handle the error or show an alert
          console.error("Failed to delete user:", response.statusText);
        }
      } catch (error) {
        // Handle the error or show an alert
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>
      <div
        className="block mx-[42%] my-10  p-2 border border-solid border-gray-300 font-bold 
    shadow-md text-center w-full sm:w-64 bg-gradient-to-r from-purple-300 to-pink-400 animate-gradient"
      >
        <div className="absolute left-1/2 transform -translate-x-2/3 -translate-y-1/2">
          <img
            src={storedUser.image}
            className="overflow-hidden w-20 h-30 bg-gray-300 rounded-full"
          />
        </div>

        <div>
          <h2 className="mb-3 mt-20 text-lg flex mx-10 text-cyan-200">
            This is your Profile
          </h2>
          <label className="flex font-bold ml-10 text-sm text-cyan-200">
            Name:
            <div className="w-full sm:w-15 mb-5 border-gray-300 rounded-md">
              {storedUser.name}
            </div>
          </label>

          <label className="flex font-bold ml-10 text-sm text-cyan-200">
            Phone:
            <div className="w-full sm:w-35 mb-5 ml-0 border-gray-300 rounded-md">
              {storedUser.phone}
            </div>
          </label>

          <label className="flex font-bold ml-10 text-sm text-cyan-200">
            Email:
            <div className="w-full sm:w-40 mb-5 border-gray-300 rounded-md">
              {storedUser.email}
            </div>
          </label>

          <label className="flex font-bold ml-10 text-sm text-cyan-200">
            Password:
            <div className="w-full sm:w-40 mb-5 mr-12 border-gray-300">
              ****
            </div>
          </label>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full sm:w-85 px-5 mb-6 font-mono text-md bg-slate-600 text-cyan-200 border-none rounded-sm cursor-pointer"
        >
          Logout
        </button>

        <button
          type="button"
          onClick={handleDeleteAccount}
          className="w-full sm:w-85 px-5 mb-6 font-mono text-md bg-slate-600 
        text-red-500 border-none rounded-sm cursor-pointer"
        >
          Delete Account?
        </button>

        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full sm:w-85 px-5 mb-6 font-mono text-md bg-slate-600 text-cyan-200 border-none rounded-sm cursor-pointer"
        >
          back
        </button>
      </div>
    </>
  );
};

export default Profile;
