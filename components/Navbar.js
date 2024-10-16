import React from "react";
import PropTypes from "prop-types";

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="dashboard">Dashboard</div>
        <div className="search">Search</div>
      </div>
      <div className="nav-right">
        <div className="notifications">Notification</div>
        <div className="settings">Settings</div>
      </div>
    </div>
  );
}

Navbar.propTypes = {};

export default Navbar;
