import React, { useState } from "react";
import "./Dashboard.css";
import Delay from "../../components/Delay/Delay";
import FlightPlanner from "../../components/FlightPlanner/FlightPlanner";
import Graph from "../../components/Graph/Graph";
import Departure from "../../components/Departure/Departure";
import Destination from "../../components/Destination/Destination";
import { useTheme } from "../../components/ThemeContext";

const Dashboard = () => {
  const { isLightMode } = useTheme();

  const [prediction, setPrediction] = useState(null);
  const [destinationCity, setDestinationCity] = useState("");

  const handlePrediction = (newPrediction, destination) => {
    setPrediction(newPrediction);
    setDestinationCity(destination);
  };

  return (
    <div className={`Dashboard ${isLightMode ? "" : "dark"}`}>
      <FlightPlanner isLightMode={isLightMode} onPredict={handlePrediction} />
      <Graph isLightMode={isLightMode} />
      <Delay isLightMode={isLightMode} />

      <Departure
        isLightMode={isLightMode}
        prediction={prediction}
        destinationCity={destinationCity}
      />
      <Destination isLightMode={isLightMode} />
    </div>
  );
};

export default Dashboard;
