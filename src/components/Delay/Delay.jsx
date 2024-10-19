import React, { useState, useEffect } from "react";
import "./Delay.css";
import {
  LinearProgress,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

// Example data from the Python function
const exampleDelayData = {
  message: "Moderate risk of delay. Monitor conditions: due to expected rain.",
  data: {
    rain: 60, // 60% rain level
    wind_speed: 40, // 40% wind speed level
    max_temp: 90, // 90% of max temperature threshold
    min_temp: 20, // 20% of min temperature threshold
    delay_probability: 70, // 70% probability of delay
  },
};

const Delay = () => {
  const [delayData, setDelayData] = useState({});

  useEffect(() => {
    // Simulate fetching data from the Python function (or API)
    setDelayData(exampleDelayData.data);
  }, []);

  return (
    <CardContent className="delay">
      <Typography className="delay-risk" variant="h6" gutterBottom>
        Delay Risk
      </Typography>

      {/* Delay Probability */}
      <Box className="delay-probability">
        <Typography variant="body1" style={{ flex: 1 }}>
          Delay Probability
        </Typography>
        <Box width="80%" mr={1}>
          <LinearProgress
            variant="determinate"
            value={delayData.delay_probability}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  delayData.delay_probability < 40
                    ? "#4caf50" // Green for low risk
                    : delayData.delay_probability < 70
                    ? "#ffeb3b" // Yellow for moderate risk
                    : "#f44336", // Red for high risk
              },
            }}
          />
        </Box>
        <Typography variant="body1">{delayData.delay_probability}%</Typography>
      </Box>

      {/* Rain */}
      <Box className="rain">
        <Typography variant="body1" style={{ flex: 1 }}>
          Rain
        </Typography>
        <Box width="80%" mr={1}>
          <LinearProgress
            variant="determinate"
            value={delayData.rain}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#2196f3", // Blue for rain
              },
            }}
          />
        </Box>
        <Typography variant="body1">{delayData.rain}%</Typography>
      </Box>

      {/* Wind Speed */}
      <Box className="wind">
        <Typography variant="body1" style={{ flex: 1 }}>
          Wind Speed
        </Typography>
        <Box width="80%" mr={1}>
          <LinearProgress
            variant="determinate"
            value={delayData.wind_speed}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#9e9e9e", // Grey for wind speed
              },
            }}
          />
        </Box>
        <Typography variant="body1">{delayData.wind_speed}%</Typography>
      </Box>

      {/* Max Temperature */}
      <Box className="max-temp">
        <Typography variant="body1" style={{ flex: 1 }}>
          Max Temperature
        </Typography>
        <Box width="80%" mr={1}>
          <LinearProgress
            variant="determinate"
            value={delayData.max_temp}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#f44336", // Red for high temperatures
              },
            }}
          />
        </Box>
        <Typography variant="body1">{delayData.max_temp}%</Typography>
      </Box>

      {/* Min Temperature */}
      <Box className="min-temp">
        <Typography variant="body1" style={{ flex: 1 }}>
          Min Temperature
        </Typography>
        <Box width="80%" mr={1}>
          <LinearProgress
            variant="determinate"
            value={delayData.min_temp}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#2196f3", // Blue for low temperatures
              },
            }}
          />
        </Box>
        <Typography variant="body1">{delayData.min_temp}%</Typography>
      </Box>
    </CardContent>
  );
};

export default Delay;
