import React from "react";
import "./Header.css";
import TextField from "@mui/material/TextField";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import { useTheme } from "../ThemeContext.js";

function Header() {
  const { isLightMode } = useTheme();

  return (
    <div className={`header ${isLightMode ? "" : "dark"}`}>
      <div className="header-left">
        <div className="dashboard">Dashboard</div>
        <div className="search-bar-container">
          <TextField
            className="search-bar" // Ensure the className prop is applied
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            placeholder="Search..."
            fullWidth // Makes the search bar take the full width of its container
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
