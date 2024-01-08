//React
import React, { useState } from "react";

//context
import { useAuth } from "../contexts/AuthContext";

import InputField from "./InputField";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  //hooks to keep login data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //hook to naviagte from page tp page
  const navigate = useNavigate();

  // user data from AuthContext
  const { login } = useAuth();

  //Log in function
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Please fill in all fields.");
        return;
      }

      // Fetch user data from db.json
      const response = await fetch("src/database/db.json");
      const data = await response.json();

      // Validate username and password from json data that already existed
      const foundUser = data.users.find(
        (user) => user.email === email && user.password === password
      );
      //if valid, log in success
      if (foundUser) {
        // Simulate login and store user data in local storage
        login(foundUser);
        navigate(-1);
        // if invalid, show that alert
      } else {
        alert("Invalid username or password. Please try again.");
      }
      // error
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div
      className="block mx-auto my-10 p-2  border rounded-lg border-y-2 
        border-cyan-300 font-bold
    shadow-md text-center w-64 bg-gradient-to-r from-purple-300 to-pink-400 animate-gradient"
    >
      <h2 className="mb-5 text-lg flex mx-10 text-cyan-200">Login Page</h2>

      <InputField
        label="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <button
        onClick={handleLogin}
        className="w-85  px-5  mb-6 font-mono text-md bg-slate-600 text-cyan-200 border-none rounded-sm cursor-pointer"
      >
        Login
      </button>

      <br />
      <p className="text-cyan-200 text-xs font-normal mb-2">
        Don't have account?
      </p>
      <Link
        to="/register"
        className="w-85  px-5  mb-6 font-mono text-md bg-slate-600 text-cyan-200 border-none rounded-sm cursor-pointer"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default Login;
