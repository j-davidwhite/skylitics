import React from "react";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import "./Support.css";

const Support = () => {
  return (
    <div className="support">
      <div className="support-top">
        <h1>How Can We Help You?</h1>
      </div>
      <div className="support-bottom">
        <div className="email-icon-wrapper">
          <MailOutlineRoundedIcon className="email-icon" />
        </div>
        <div className="contact">
          <h4>Send us an email:</h4>
          <h3>info@skylytics.io</h3>
        </div>
      </div>
    </div>
  );
};

export default Support;
