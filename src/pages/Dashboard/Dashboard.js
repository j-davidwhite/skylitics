import React from "react";
import "./Dashboard.css";
import Delay from "../../components/Delay/Delay";
import FlightPlanner from "../../components/FlightPlanner/FlightPlanner";
import Graph from "../../components/Graph/Graph";
import Departure from "../../components/Departure/Departure";
import Destination from "../../components/Destination/Destination";
import { useTheme } from "../../components/ThemeContext"; // Import useTheme

const Dashboard = () => {
  const { isLightMode } = useTheme(); // Use theme context to get isLightMode

  return (
    <div className={`Dashboard ${isLightMode ? "" : "dark"}`}>
      <FlightPlanner isLightMode={isLightMode} />
      <Graph isLightMode={isLightMode} />
      <Delay isLightMode={isLightMode} />
      <Departure isLightMode={isLightMode} />
      <Destination isLightMode={isLightMode} />
    </div>
  );
};

export default Dashboard;
