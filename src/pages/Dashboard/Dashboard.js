import React, { useState } from "react";
import "./Dashboard.css";
import Delay from "../../components/Delay/Delay";
import FlightPlanner from "../../components/FlightPlanner/FlightPlanner";
import CostAnalysis from "../../components/CostAnalysis/CostAnalysis";
import Departure from "../../components/Departure/Departure";
import Destination from "../../components/Destination/Destination";
import BarChart from "../../components/BarChart/BarChart";
import PieChart from "../../components/PieChart/PieChart";
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
      <FlightPlanner
        isLightMode={isLightMode}
        onPredict={handlePrediction}
        destinationCity={destinationCity}
        setDestinationCity={setDestinationCity}
      />
      <CostAnalysis
        isLightMode={isLightMode}
        destinationCity={destinationCity}
        prediction={prediction}
      />
      <Delay isLightMode={isLightMode} destinationCity={destinationCity} />
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
