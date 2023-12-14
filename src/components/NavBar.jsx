//React
import React from "react";
import { NavLink } from "react-router-dom";

// component for user status
import UserStatus from "./UserStatus";

//context
import { useTheme } from "../contexts/ThemeContext";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();

  if (theme === "day") {
    document.body.style.backgroundColor = "black";
  } else {
    document.body.style.backgroundColor = "white";
  }


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
    <nav>
      <span className="text-xl">
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
  );
};

export default NavBar;
