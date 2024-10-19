import React from "react";
import "./Dashboard.css";
import Delay from "../../components/Delay/Delay";
import FlightPlanner from "../../components/FlightPlanner/FlightPlanner";
import Graph from "../../components/Graph/Graph";
import Departure from "../../components/Departure/Departure";
import Destination from "../../components/Destination/Destination";

const Dashboard = () => {
  // Added component declaration
  return (
    <div className="Dashboard">
      <FlightPlanner />
      <Graph />
      <Delay />
      <Departure />
      <Destination />
    </div>
  );
};

export default Dashboard;
