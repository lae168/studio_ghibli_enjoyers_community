//React
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// component for user status
import UserStatus from "./UserStatus";

//context
import { useTheme } from "../../contexts/ThemeContext";
import Sidebar from "../Sidebar";
import { useAuth } from "../../contexts/AuthContext";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();

  if (theme === "day") {
    document.body.style.backgroundColor = "black";
  } else {
    document.body.style.backgroundColor = "white";
  }

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    console.log("toogle side bar");
  };
  const { user } = useAuth();

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

  return (
    <>
      <nav>
        <span className="text-xl flex items-center mx-36">
          {/* Sidebar icon */}
          <div
            className={`sidebar ${
              sidebarVisible ? "visible" : ""
            } hover:cursor-pointer`}
          >
            <span role="img" className="sidebar-icon" onClick={toggleSidebar}>
              📚
            </span>
          </div>

          {/* Assignment-6 link */}
          <NavLink style={activeStyle} to="/">
            Assignment-6
          </NavLink>
        </span>

        <span className="flex items-center space-x-4">
          <NavLink style={activeStyle} to="/posts">
            Posts
          </NavLink>

          <UserStatus />
          <div className={`theme-${theme}`}>
            <button className="theme-btn" onClick={toggleTheme}>
              {theme === "day" ? "☀️" : "🌙"}
            </button>
          </div>
        </span>
      </nav>

      <nav className={sidebarVisible ? "nav-menu active" : "nav-menu"}>
        {user ? (
          <>
            <>
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
              <span className="font-semibold mt-3 hidden sm:inline-block">
                {user.name}
              </span>
            </>
          </>
        ) : (
          <NavLink to="/login" className="h-10 p-1" style={activeStyle}>
            Login
          </NavLink>
        )}
      </nav>
    </>
  );
};

export default NavBar;
