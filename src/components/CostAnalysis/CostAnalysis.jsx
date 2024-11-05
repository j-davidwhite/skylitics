import React from "react";
import "./CostAnalysis.css";
import virgin from "../../assets/icons8-virgin.png";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";

// Function to retrieve flight code based on destination city
const getFlightCode = (destinationCity) => {
  if (!destinationCity) {
    return "-";
  }
  switch (destinationCity) {
    case "Brisbane":
      return "BNE";
    case "Perth":
      return "PER";
    case "Sydney":
      return "SYD";
    default:
      return "-";
  }
};

const CostAnalysis = ({ destinationCity, prediction }) => {
  const flightCode = getFlightCode(destinationCity); // Get flight code for selected city

  return (
    <div className="cost-analysis">
      <div className="container-top">
        <div className="heading">Cost Analysis</div>
      </div>
      <div className="container-bottom">
        {/* Airline logo */}
        <img src={virgin} className="virgin-logo" alt="Virgin Australia Logo" />

        {/* Flight information */}
        <div className="bottom-left">
          <div className="virgin-australia">Virgin Australia</div>
          <div className="flight-code">MLB • {flightCode} • VA</div>
        </div>

        {/* Price prediction display */}
        <div className="bottom-right">
          <div className="price-prediction">
            ${prediction ? prediction["priceMelbourne"] : "-"}
          </div>
          <div className="price">price</div>
        </div>
      </div>
    </div>
  );
};

export default CostAnalysis;
