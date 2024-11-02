import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./BarChart.css";

const dataset = [
  { day: "Monday", price: 120 },
  { day: "Tuesday", price: 135 },
  { day: "Wednesday", price: 140 },
  { day: "Thursday", price: 125 },
  { day: "Friday", price: 150 },
  { day: "Saturday", price: 180 },
  { day: "Sunday", price: 160 },
];

function BarChart() {
  const svgRef = useRef();
  const [sortBy, setSortBy] = useState("day");

  useEffect(() => {
    const sortedData = [...dataset].sort((a, b) =>
      sortBy === "price" ? b.price - a.price : d3.ascending(a.day, b.day)
    );

    const svg = d3.select(svgRef.current);
    const width = 900;
    const height = 550;
    const padding = 80;

    svg.selectAll("*").remove();

    const xScale = d3
      .scaleBand()
      .domain(sortedData.map((d) => d.day))
      .range([padding, width - padding])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(sortedData, (d) => d.price)])
      .range([height - padding, padding]);

    const colorScale = d3
      .scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(sortedData, (d) => d.price)]);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - padding})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${padding},0)`)
      .call(d3.axisLeft(yScale));

    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("x", width / 2)
      .attr("y", height - 20)
      .style("text-anchor", "middle")
      .text("Day of the Week");

    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("x", -height / 2)
      .attr("y", 20)
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .text("Average Flight Price (USD)");

    svg
      .selectAll("rect")
      .data(sortedData)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.day))
      .attr("y", (d) => yScale(d.price))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - padding - yScale(d.price))
      .attr("fill", (d) => colorScale(d.price))
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`${d.day}<br/>$${d.price}`)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });
  }, [sortBy]);

  return (
    <div className="bar-chart">
      <h2>Average Flight Prices per Day</h2>
      <button onClick={() => setSortBy("price")}>Sort by Price</button>
      <button onClick={() => setSortBy("day")}>Sort by Day</button>
      <svg ref={svgRef} width={900} height={550}></svg>
    </div>
  );
}

export default BarChart;