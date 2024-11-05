import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Analytics from "./pages/Analytics/Analytics";
import About from "./pages/About/About";
import Support from "./pages/Support/Support";

// Main content component handling routing and theme-based styling
function AppContent() {
  const { isLightMode } = useTheme(); // Access theme mode
  const [prediction, setPrediction] = useState(null); // State for prediction data
  const [destinationCity, setDestinationCity] = useState(""); // State for selected city

  // Update prediction and destination city states
  const handlePrediction = (newPrediction, destination) => {
    setPrediction(newPrediction);
    setDestinationCity(destination);
  };

  return (
    <div className={`App ${isLightMode ? "" : "dark"}`}>
      <Sidebar className="sidebar" />
      <Header className="header" />

      <div className={`main-content ${isLightMode ? "" : "dark"}`}>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                prediction={prediction}
                destinationCity={destinationCity}
                setPrediction={handlePrediction} // Pass update function to Dashboard
              />
            }
          />
          <Route
            path="/analytics"
            element={
              <Analytics
                prediction={prediction}
                destinationCity={destinationCity}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>
    </div>
  );
}

// Root app component with theme and router providers
function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
