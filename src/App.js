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

function AppContent() {
  const { isLightMode } = useTheme();
  const [prediction, setPrediction] = useState(null);
  const [destinationCity, setDestinationCity] = useState("");

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
                setPrediction={handlePrediction}
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
