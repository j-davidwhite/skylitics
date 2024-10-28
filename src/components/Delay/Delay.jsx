import React, { useState, useEffect } from "react";
import rain from "../../assets/icons8-rain.png";
import wind from "../../assets/icons8-wind.png";
import maxTemp from "../../assets/icons8-maxtemp.png";
import minTemp from "../../assets/icons8-mintemp.png";
import delay from "../../assets/icons8-delay.png";
import { useTheme } from "../ThemeContext";
import "./Delay.css";
import { LinearProgress, Box, Typography, CardContent } from "@mui/material";

// Example data from the Python function
const exampleDelayData = {
  message: "Moderate risk of delay. Monitor conditions: due to expected rain.",
  data: {
    rain: 60,
    wind_speed: 40,
    max_temp: 90,
    min_temp: 20,
    delay_probability: 70,
  },
};

const Delay = () => {
  const [delayData, setDelayData] = useState({});
  const { isLightMode } = useTheme();

  useEffect(() => {
    setDelayData(exampleDelayData.data);
  }, []);

  return (
    <CardContent className={`delay ${isLightMode ? "light" : "dark"}`}>
      <div className="delay-risk">
        <Typography variant="h6" gutterBottom>
          Delay Risk
        </Typography>
      </div>

      {/* Delay Probability */}
      <Box className="delay-probability">
        <Typography variant="body1" style={{ flex: 1 }}>
          Delay Probability
        </Typography>
        <Box width="50%" mr={4.8}>
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
          Rain <img src={rain} alt="Rain Icon" />
        </Typography>
        <Box width="50%" mr={4.8}>
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
          Wind Speed <img src={wind} alt="Wind Icon" />
        </Typography>
        <Box width="50%" mr={4.8}>
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
          Max Temperature <img src={maxTemp} alt="Max Temperature Icon" />
        </Typography>
        <Box width="50%" mr={4.8}>
          <LinearProgress
            variant="determinate"
            value={delayData.max_temp}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#ff5722", // Orange for high temperatures
              },
            }}
          />
        </Box>
        <Typography variant="body1">{delayData.max_temp}%</Typography>
      </Box>

      {/* Min Temperature */}
      <Box className="min-temp">
        <Typography variant="body1" style={{ flex: 1 }}>
          Min Temperature <img src={minTemp} alt="Min Temperature Icon" />
        </Typography>
        <Box width="50%" mr={4.8}>
          <LinearProgress
            variant="determinate"
            value={delayData.min_temp}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#00bcd4", // Cyan for low temperatures
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
