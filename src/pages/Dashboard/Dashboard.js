import React from "react";
import "./Dashboard.css";
import Delay from "../../components/Delay/Delay";
import FlightPlanner from "../../components/FlightPlanner/FlightPlanner";
import CostAnalysis from "../../components/CostAnalysis/CostAnalysis";
import Departure from "../../components/Departure/Departure";
import Destination from "../../components/Destination/Destination";
import { useTheme } from "../../components/ThemeContext";

const Dashboard = ({ prediction, destinationCity, setPrediction }) => {
  const { isLightMode } = useTheme();

  const handlePrediction = (newPrediction, destination) => {
    setPrediction(newPrediction, destination);
  };

  return (
    <div className={`Dashboard ${isLightMode ? "" : "dark"}`}>
      <FlightPlanner
        isLightMode={isLightMode}
        onPredict={handlePrediction}
        destinationCity={destinationCity}
        setDestinationCity={(city) => setPrediction(prediction, city)}
      />
      <CostAnalysis
        isLightMode={isLightMode}
        destinationCity={destinationCity}
        prediction={prediction}
      />
      <Delay
        isLightMode={isLightMode}
        destinationCity={destinationCity}
        prediction={prediction}
      />
      <Departure isLightMode={isLightMode} prediction={prediction} />
      <Destination
        isLightMode={isLightMode}
        prediction={prediction}
        destinationCity={destinationCity}
      />
    </div>
  );
};

export default Dashboard;
