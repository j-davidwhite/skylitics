import React from "react";
import "./Departure.css";
import { useTheme } from "../ThemeContext";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import umbrellaLight from "../../assets/icons8-umbrella-light.png";
import umbrellaDark from "../../assets/icons8-umbrella-dark.png";
import windLight from "../../assets/icons8-wind-light.png";
import windDark from "../../assets/icons8-wind-dark.png";
import sunLight from "../../assets/icons8-sun-light.png";
import sunDark from "../../assets/icons8-sun-dark.png";

const Departure = ({ prediction, destinationCity }) => {
  const { isLightMode } = useTheme();

  return (
    <div className="Departure">
      <div className="departure-left">
        <div className="maxTemp">
          <img src={isLightMode ? sunLight : sunDark} />| &nbsp;&nbsp;
          {prediction ? prediction["maxTempMelbourne"] : "-"}
          &deg;C
        </div>
        <div className="rain">
          <img
            src={isLightMode ? umbrellaLight : umbrellaDark}
            alt="Umbrella Icon"
          />
          |&nbsp;&nbsp; Rain 1mm
        </div>
        <div className="wind">
          <img src={isLightMode ? windLight : windDark} alt="Wind Icon" />|
          &nbsp;&nbsp; Wind 15k/m
        </div>
      </div>
      <div className="departure-right">
        <div className="location">
          <LocationOnSharpIcon />
          <div>Melbourne</div>
          <KeyboardArrowDownSharpIcon />
        </div>
        <div className="plane-ticket">$48.50</div>
      </div>
    </div>
  );
};

export default Departure;
