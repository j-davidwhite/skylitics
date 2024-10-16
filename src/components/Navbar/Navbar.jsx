import React from "react";
import "./Navbar.css"; // Ensure your CSS is correctly imported
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import Searchbar from "./Searchbar/Searchbar.jsx";
import { useTheme } from "../ThemeContext";

function Navbar() {
  const { isLightMode } = useTheme(); // Access the theme context

  return (
    <div className={`navbar ${isLightMode ? "" : "dark"}`}>
      {" "}
      {/* Only apply dark class when not in light mode */}
      <div className="nav-left">
        <div className="dashboard">Dashboard</div>
        <Searchbar />
      </div>
      <div className="nav-right">
        <NotificationsSharpIcon className="notifications" />
        <SettingsSharpIcon className="settings" />
      </div>
    </div>
  );
}

// You can omit PropTypes if not used
export default Navbar;
