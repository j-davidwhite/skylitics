import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  // Define sidebar items with text, corresponding icons, and paths
  const sidebarItems = [
    { text: "Dashboard", icon: <DashboardOutlinedIcon />, path: "/Dashboard" },
    { text: "Analytics", icon: <AnalyticsOutlinedIcon />, path: "/Analytics" },
    { text: "About", icon: <InfoOutlinedIcon />, path: "/About" },
    { text: "Support", icon: <SupportAgentOutlinedIcon />, path: "/Support" },
  ];

  const handleClick = (index) => {
    setSelected(index); // Update selected index on click
  };

  return (
    <div className={`sidebar ${isLightMode ? "light" : "dark"}`}>
      <div className="sidebar-top">
        <div className="skylytics">
          Skylytics <img className="logo" src={logo} alt="Skylitics Logo" />
        </div>
      </div>
      <div className="sidebar-middle">
        {sidebarItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`sidebar-link`}
            onClick={() => handleClick(index)}
          >
            <div
              className={`sidebar-item ${selected === index ? "selected" : ""}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-text">{item.text}</span>
            </div>
          </Link>
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
