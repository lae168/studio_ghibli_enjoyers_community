//React
import React, { createContext, useContext, useState, useEffect } from "react";


//creating context for theme
const ThemeContext = createContext();

//custom hook
export function useTheme() {
  return useContext(ThemeContext);
}


// Provider for ThemeContext
export function ThemeProvider({ children }) {

  // to keep the state of theme
  const [theme, setTheme] = useState("day");


  // store theme in local storage using hook
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);


  // function for changing theme
  const toggleTheme = () => {
    const newTheme = theme === "day" ? "night" : "day";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
