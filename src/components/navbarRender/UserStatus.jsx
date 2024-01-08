// React
import React from "react";
import { NavLink } from "react-router-dom";

// Context
import { useAuth } from "../../contexts/AuthContext";

const UserStatus = () => {
  const { user, logout } = useAuth();
  const activeStyle = ({ isActive }) => {
    return {
      textDecoration: isActive ? "none" : "",
      color: isActive ? "aqua" : "",
      borderColor: isActive ? "aqua" : "transparent",
      borderStyle: "solid",
      borderWidth: "2px",
      borderRadius: "5px",
      transition: "color 0.3s ease", // Add transition for smooth color change
      ":hover": {
        color: "linear-gradient(to right, #ff4e50, #f9d423)", // Gradient color for hover
        transition: "color 0.3s ease", // Add transition for smooth color change on hover
      },
    };
  };

  // if user is logged in, show user name,profile picture and log out button ,
  // if not, show log in button
  // with conditional rendering

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <>
          <NavLink
            style={activeStyle}
            to="/create"
            className="hidden sm:inline-block"
          >
            Create Posts
          </NavLink>
          <NavLink to="/profile">
            {user.image && (
              <img
                src={user.image}
                alt="User"
                style={{
                  width: "30px",
                  borderRadius: "50%",
                }}
                className="hover:opacity-30  duration-600"
              />
            )}
          </NavLink>

          <span className="font-semibold mr-20 hidden sm:inline-block">
            {user.name}
          </span>
          <button
            onClick={logout}
            className="bg-slate-500 text-white px-3 py-1 rounded hidden sm:inline-block"
          >
            Logout
          </button>
        </>
      ) : (
        <NavLink to="/login" style={activeStyle}>
          Login
        </NavLink>
      )}
    </div>
  );
};

export default UserStatus;
