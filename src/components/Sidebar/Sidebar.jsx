import React, { useState } from "react";
import { useTheme } from "../ThemeContext";
import "./Sidebar.css";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import DarkModeSharpIcon from "@mui/icons-material/DarkModeSharp";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import logo from "../../assets/travel.png";

function Sidebar() {
  const [selected, setSelected] = useState(0); // Track selected item, default to first element
  const { isLightMode, toggleTheme } = useTheme(); // Use the theme context

  const handleClick = (index) => {
    setSelected(index); // Update selected index on click
  };

  // Define sidebar items with text and corresponding icons
  const sidebarItems = [
    { text: "Dashboard", icon: <DashboardOutlinedIcon /> },
    { text: "Analytics", icon: <AnalyticsOutlinedIcon /> },
    { text: "About", icon: <InfoOutlinedIcon /> },
    { text: "Support", icon: <SupportAgentOutlinedIcon /> },
  ];

  return (
    <div className={`sidebar ${isLightMode ? "light" : "dark"}`}>
      <div className="sidebar-top">
        <div className="skylitics">
          Skylitics <img className="logo" src={logo}></img>
        </div>
      </div>
      <div className="sidebar-middle">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)} // Set selected on click
            className={`sidebar-item ${selected === index ? "selected" : ""}`} // Apply class based on selection
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-text">{item.text}</span>
          </div>
        ))}
      </div>
      <div className="sidebar-bottom">
        <div
          className={`icon-container ${isLightMode ? "selected" : ""}`}
          onClick={toggleTheme} // Toggle theme on click
          aria-label="Switch to Light Mode" // Accessibility label
        >
          <LightModeSharpIcon
            className={`light-mode ${!isLightMode ? "glow" : ""}`}
          />
        </div>
        <div
          className={`icon-container ${!isLightMode ? "selected" : ""}`}
          onClick={toggleTheme} // Toggle theme on click
          aria-label="Switch to Dark Mode" // Accessibility label
        >
          <DarkModeSharpIcon
            className={`dark-mode ${isLightMode ? "glow" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
