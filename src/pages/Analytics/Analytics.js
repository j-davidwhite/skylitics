import React from "react";
import "./Analytics.css";
import { useTheme } from "../../components/ThemeContext";
import Delay from "../../components/Delay/Delay";
import CostAnalysis from "../../components/CostAnalysis/CostAnalysis";
import Departure from "../../components/Departure/Departure";
import Destination from "../../components/Destination/Destination";

import BarChart from "../../components/BarChart/BarChart";
import PieChart from "../../components/PieChart/PieChart";

const Analytics = () => {
  return (
    <div className="analytics">
      <BarChart />
      <PieChart />

      <div className="bar-info">
        <h4>Bar Chart: Average Flight Prices by Day</h4>
        <p>
          The "Average Flight Prices per Day" bar chart visualizes average
          flight costs across each day of the week. This helps users identify
          which days offer more economical fares, supporting better budget
          planning. Users can sort by price or day to reveal cost-saving trends
          for optimal travel timing.
        </p>
      </div>

      <div className="pie-info">
        <h4>Pie Chart: Annual Weather Overview – Temperature vs. Rainfall</h4>
        <p>
          The "Weather Breakdown by Year" pie chart compares average temperature
          and rainfall for each selected year. This overview helps users
          understand weather trends at a glance, with options to view changes
          across different years, making it useful for travel and event planning
          based on historical climate data.
        </p>
      </div>

      <CostAnalysis />
      <Delay />

      <div className="cost-info">
        <h4>Cost Analysis: Predicted Flight Cost Overview</h4>
        <p>
          The Cost Analysis section provides a streamlined view of estimated
          flight costs for Virgin Australia flights from Melbourne (MLB) to a
          selected destination. This insight supports budget-conscious planning
          by giving users a clear price estimate for their selected route.
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

      <Departure />
      <Destination />
      <div className="departure-info">
        <h4>Takeoff Weather Forecast for Melbourne</h4>
        <p>
          The Departure section provides essential weather predictions for
          takeoff conditions from Melbourne, with details on rain levels, wind
          speed, and maximum temperature. This helps travelers and crew
          anticipate conditions that may affect flight timing and comfort.
        </p>
      </div>

      <div className="destination-info">
        <h4>Landing Weather Forecast for Selected City</h4>
        <p>
          The Destination section offers a focused prediction of landing
          conditions for the selected city, whether Brisbane, Perth, or Sydney.
          This forecast assists users in preparing for arrival weather
          conditions, including expected rainfall, wind speed, and temperature.
        </p>
      </div>
    </div>
  );
};

export default Analytics;
