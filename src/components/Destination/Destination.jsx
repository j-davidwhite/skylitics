import React from "react";
import "./Destination.css";
import { useTheme } from "../ThemeContext";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import umbrellaLight from "../../assets/icons8-umbrella-light.png";
import umbrellaDark from "../../assets/icons8-umbrella-dark.png";
import windLight from "../../assets/icons8-wind-light.png";
import windDark from "../../assets/icons8-wind-dark.png";

const Destination = ({ destinationCity, prediction }) => {
  const { isLightMode } = useTheme();
  return (
    <div className="destination">
      <div className="destination-left">
        <div className="forecast">Landing</div>
        <div className="rain">
          <img
            src={isLightMode ? umbrellaLight : umbrellaDark}
            alt="Umbrella Icon"
          />
          |&nbsp;&nbsp; {prediction ? prediction["rainDestination"] : "-"}mm
        </div>
        <div className="wind">
          <img src={isLightMode ? windLight : windDark} alt="Wind Icon" />|
          &nbsp;&nbsp;
          {prediction ? prediction["windSpeedDestination"] : "-"}k/m
        </div>
      </div>
      <div className="destination-right">
        <div className="location">
          <LocationOnSharpIcon />
          <div>{destinationCity ? destinationCity : "-"}</div>
          <KeyboardArrowDownSharpIcon />
        </div>
        <div className="maxTemp">
          &nbsp;&nbsp;
          {prediction ? prediction["maxTempDestination"] : "-"}&deg;C
        </div>
      </div>
    </div>
  );
};

export default Destination;
