import React from "react";
import "./Analytics.css";
import { useTheme } from "../../components/ThemeContext";
import Delay from "../../components/Delay/Delay";
import CostAnalysis from "../../components/CostAnalysis/CostAnalysis";
import Departure from "../../components/Departure/Departure";
import Destination from "../../components/Destination/Destination";
import BarChart from "../../components/BarChart/BarChart";
import PieChart from "../../components/PieChart/PieChart";

const Analytics = ({ prediction, destinationCity }) => {
  const { isLightMode } = useTheme();

  return (
    <div className={`analytics ${isLightMode ? "" : "dark"}`}>
      <BarChart />
      <PieChart />

      <div className="bar-info">
        <h4>Bar Chart: Average Flight Prices by Day</h4>
        <p>
          The "Average Flight Prices per Day" bar chart visualizes average
          flight costs across each day of the week. This helps users identify
          which days offer more economical fares, supporting better budget
          planning.
        </p>
      </div>

      <div className="pie-info">
        <h4>Pie Chart: Annual Weather Overview – Temperature vs. Rainfall</h4>
        <p>
          The "Weather Breakdown by Year" pie chart compares average temperature
          and rainfall for each selected year. This overview helps users
          understand weather trends at a glance.
        </p>
      </div>

      <CostAnalysis prediction={prediction} destinationCity={destinationCity} />
      <Delay prediction={prediction} destinationCity={destinationCity} />

      <div className="cost-info">
        <h4>Cost Analysis: Predicted Flight Cost Overview</h4>
        <p>
          The Cost Analysis section provides a streamlined view of estimated
          flight costs for Virgin Australia flights from Melbourne (MLB) to a
          selected destination.
        </p>
      </div>

      <div className="delay-info">
        <h4>Flight Delay Analysis</h4>
        <p>
          This section provides insights into potential flight delays based on
          historical data and real-time conditions, helping users prepare for
          any expected disruptions to their travel plans.
        </p>
      </div>

      <Departure prediction={prediction} />
      <Destination prediction={prediction} destinationCity={destinationCity} />

      <div className="departure-info">
        <h4>Takeoff Weather Forecast for Melbourne</h4>
        <p>
          The Departure section provides essential weather predictions for
          takeoff conditions from Melbourne, with details on rain levels, wind
          speed, and maximum temperature.
        </p>
      </div>

      <div className="destination-info">
        <h4>Landing Weather Forecast for Selected City</h4>
        <p>
          The Destination section offers a focused prediction of landing
          conditions for the selected city, whether Brisbane, Perth, or Sydney.
        </p>
      </div>
    </div>
  );
};

export default Analytics;
