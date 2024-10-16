// ThemeContext.js
import React, { createContext, useContext, useState } from "react";

// Create a context for the theme
const ThemeContext = createContext();

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);

// Define color themes
const themes = {
  light: {
    sidebar: {
      background: "#e8e8e8",
      color: "#000000",
    },
    navbar: {
      background: "#ffffff",
      color: "#000000",
    },
    // Add other components as needed
  },
  dark: {
    sidebar: {
      background: "#green",
      color: "#ffffff",
    },
    navbar: {
      background: "green",
      color: "#ffffff",
    },
    // Add other components as needed
  },
};

// Provider component
export const ThemeProvider = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState(true); // Default to light mode

  const toggleTheme = () => {
    setIsLightMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        isLightMode,
        toggleTheme,
        theme: isLightMode ? themes.light : themes.dark, // Determine the current theme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
