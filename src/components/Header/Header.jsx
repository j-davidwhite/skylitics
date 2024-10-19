import React from "react";
import "./Header.css";
import TextField from "@mui/material/TextField";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import { useTheme } from "../ThemeContext.js";
import { useLocation } from "react-router-dom";

function Header() {
  const { isLightMode } = useTheme();
  const location = useLocation();

  const getPageName = () => {
    switch (
      location.pathname.toLowerCase() // Convert pathname to lowercase
    ) {
      case "/":
        return "Dashboard";
      case "/analytics":
        return "Analytics";
      case "/about":
        return "About";
      case "/support":
        return "Support";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className={`header ${isLightMode ? "" : "dark"}`}>
      <div className="header-left">
        <div className="dashboard">{getPageName()}</div>
        <div className="search-bar-container">
          <TextField
            className="search-bar"
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            placeholder="Search..."
            fullWidth
          />
        </div>
      </div>
      <div className="header-right">
        <div className="notifications-container">
          <NotificationsSharpIcon className="notifications" />
        </div>
        <div className="settings-container">
          <SettingsSharpIcon className="settings" />
        </div>
      </div>
    </div>
  );
}

export default Header;
