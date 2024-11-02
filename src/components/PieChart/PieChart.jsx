import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./PieChart.css";

const dataByYear = {
  2018: { temperature: 23, rainfall: 85 },
  2019: { temperature: 24, rainfall: 95 },
  2020: { temperature: 22, rainfall: 100 },
  2021: { temperature: 25, rainfall: 78 },
};

function PieChart() {
  const svgRef = useRef();
  const [year, setYear] = useState("2018");

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(["#4daf4a", "#377eb8"]);

    svg.selectAll("*").remove(); // Clear any existing content in the SVG

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`); // Corrected here

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const data = [
      {
        label: "Average Temperature (°C)",
        value: dataByYear[year].temperature,
      },
      { label: "Average Rainfall (mm)", value: dataByYear[year].rainfall },
    ];

    g.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc")
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .transition()
      .ease(d3.easeBackOut)
      .duration(1000)
      .attrTween("d", function (d) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return (t) => arc(i(t));
      });

    g.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`) // Corrected here
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "white")
      .text((d) => `${d.data.label}: ${d.data.value}`); // Corrected here
  }, [year]);

  return (
    <div style={{ marginBottom: "40px" }} className="pie-chart">
      <h2>Weather Breakdown by Year (Temperature vs. Rainfall)</h2>
      <label>
        Select Year:
        <select onChange={(e) => setYear(e.target.value)} value={year}>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
        </select>
      </label>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default PieChart;
