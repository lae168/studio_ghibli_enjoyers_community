// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// creating a context for authentication
const AuthContext = createContext();


//provider for Auth Context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from localStorage on initial load
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    // Save user data to localStorage and update state
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    // Remove user data from localStorage and update state
    window.location.href = "/login";
    localStorage.removeItem('user');
    
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
