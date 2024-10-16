import React from "react";
import PropTypes from "prop-types";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <div className="skylitics">Skylitics</div>
      <div className="dashboard">Dashboard</div>
      <div className="analytics">Analytics</div>
      <div className="about">About</div>
      <div className="support">Support</div>
      <div>
        <div className="light-mode">Light mode</div>
        <div className="dark-mode">Dark Mode</div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
