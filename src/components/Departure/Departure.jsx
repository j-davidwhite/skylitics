import React from "react";
import "./Departure.css";
import { useTheme } from "../ThemeContext";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import umbrellaLight from "../../assets/icons8-umbrella-light.png";
import umbrellaDark from "../../assets/icons8-umbrella-dark.png";
import windLight from "../../assets/icons8-wind-light.png";
import windDark from "../../assets/icons8-wind-dark.png";

const Departure = ({ prediction }) => {
  const { isLightMode } = useTheme();

  return (
    <div className="Departure">
      <div className="departure-left">
        <div className="forecast">Take Off</div>
        <div className="rain">
          <img
            src={isLightMode ? umbrellaLight : umbrellaDark}
            alt="Umbrella Icon"
          />
          |&nbsp;&nbsp; {prediction ? prediction["rainMelbourne"] : "-"}mm
        </div>
        <div className="wind">
          <img src={isLightMode ? windLight : windDark} alt="Wind Icon" />|
          &nbsp;&nbsp;
          {prediction ? prediction["windSpeedMelbourne"] : "-"}k/m
        </div>
      </div>
      <div className="departure-right">
        <div className="location">
          <LocationOnSharpIcon />
          <div>Melbourne</div>
          <KeyboardArrowDownSharpIcon />
        </div>
        <div className="maxTemp">
          &nbsp;&nbsp;
          {prediction ? prediction["maxTempMelbourne"] : "-"}&deg;C
        </div>
      </div>
    </div>
  );
};

export default Departure;
