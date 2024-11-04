import React from "react";
import rain from "../../assets/icons8-rain.png";
import wind from "../../assets/icons8-wind.png";
import maxTemp from "../../assets/icons8-maxtemp.png";
import minTemp from "../../assets/icons8-mintemp.png";
import { useTheme } from "../ThemeContext";
import "./Delay.css";
import { LinearProgress, Box, Typography, CardContent } from "@mui/material";

// Updated thresholds to match realistic values
const THRESHOLDS = {
  maxTempBaseline: 20, // Start contributing above 20°C
  maxTempFull: 40, // Full contribution at 40°C
  minTempBaseline: -5, // Start contributing below -5°C
  minTempFull: -15, // Full contribution at -15°C
  rainFull: 30, // Full contribution at 30 mm
  windSpeedFull: 60, // Full contribution at 60 km/h
};

// Contribution calculation for temperatures above or below the threshold baselines
const calculateHighTempContribution = (value) => {
  if (value > THRESHOLDS.maxTempFull) return 100;
  if (value > THRESHOLDS.maxTempBaseline) {
    return (
      ((value - THRESHOLDS.maxTempBaseline) /
        (THRESHOLDS.maxTempFull - THRESHOLDS.maxTempBaseline)) *
      100
    );
  }
  return 0;
};

const calculateMinTempContribution = (value) => {
  if (value < THRESHOLDS.minTempFull) return 100;
  if (value < THRESHOLDS.minTempBaseline) {
    return (
      ((THRESHOLDS.minTempBaseline - value) /
        (THRESHOLDS.minTempBaseline - THRESHOLDS.minTempFull)) *
      100
    );
  }
  return 0;
};

// Calculate contribution based on closeness to full threshold
const calculateRainContribution = (value) => {
  return Math.min((value / THRESHOLDS.rainFull) * 100, 100);
};

const calculateWindSpeedContribution = (value) => {
  return Math.min((value / THRESHOLDS.windSpeedFull) * 100, 100);
};

const Delay = ({ prediction }) => {
  const { isLightMode } = useTheme();

  const delayData = {
    delay_probability: prediction
      ? Math.min(
          (calculateRainContribution(
            Math.max(prediction["rainMelbourne"], prediction["rainDestination"])
          ) +
            calculateWindSpeedContribution(
              Math.max(
                prediction["windSpeedMelbourne"],
                prediction["windSpeedDestination"]
              )
            ) +
            calculateHighTempContribution(
              Math.max(
                prediction["maxTempMelbourne"],
                prediction["maxTempDestination"]
              )
            ) +
            calculateMinTempContribution(
              Math.min(
                prediction["minTempMelbourne"],
                prediction["minTempDestination"]
              )
            )) /
            4,
          100
        ).toFixed(1)
      : "0.0",
    rain: prediction
      ? calculateRainContribution(
          Math.max(prediction["rainMelbourne"], prediction["rainDestination"])
        ).toFixed(1)
      : "0.0",
    wind_speed: prediction
      ? calculateWindSpeedContribution(
          Math.max(
            prediction["windSpeedMelbourne"],
            prediction["windSpeedDestination"]
          )
        ).toFixed(1)
      : "0.0",
    max_temp: prediction
      ? calculateHighTempContribution(
          Math.max(
            prediction["maxTempMelbourne"],
            prediction["maxTempDestination"]
          )
        ).toFixed(1)
      : "0.0",
    min_temp: prediction
      ? calculateMinTempContribution(
          Math.min(
            prediction["minTempMelbourne"],
            prediction["minTempDestination"]
          )
        ).toFixed(1)
      : "0.0",
  };

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
            value={parseFloat(delayData.delay_probability)}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  delayData.delay_probability < 40
                    ? "#4caf50"
                    : delayData.delay_probability < 70
                    ? "#ffeb3b"
                    : "#f44336",
              },
            }}
          />
        </Box>
        <Typography variant="body1">{delayData.delay_probability}%</Typography>
      </Box>

      {/* Rain Contribution */}
      <Box className="rain">
        <Typography variant="body1" style={{ flex: 1 }}>
          Rain
        </Typography>
        <Box width="50%" mr={4.8}>
          <LinearProgress
            variant="determinate"
            value={parseFloat(delayData.rain)}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": { backgroundColor: "#2196f3" },
            }}
          />
        </Box>
        <Typography variant="body1">{delayData.rain}%</Typography>
      </Box>

      {/* Wind Speed Contribution */}
      <Box className="wind">
        <Typography variant="body1" style={{ flex: 1 }}>
          Wind Speed
        </Typography>
        <Box width="50%" mr={4.8}>
          <LinearProgress
            variant="determinate"
            value={parseFloat(delayData.wind_speed)}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": { backgroundColor: "#9e9e9e" },
            }}
          />
        </Box>
        <Typography variant="body1">{delayData.wind_speed}%</Typography>
      </Box>

      {/* Max Temperature Contribution */}
      <Box className="max-temp">
        <Typography variant="body1" style={{ flex: 1 }}>
          Max Temperature
        </Typography>
        <Box width="50%" mr={4.8}>
          <LinearProgress
            variant="determinate"
            value={parseFloat(delayData.max_temp)}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": { backgroundColor: "#ff5722" },
            }}
          />
        </Box>
        <Typography variant="body1">{delayData.max_temp}%</Typography>
      </Box>

      {/* Min Temperature Contribution */}
      <Box className="min-temp">
        <Typography variant="body1" style={{ flex: 1 }}>
          Min Temperature
        </Typography>
        <Box width="50%" mr={4.8}>
          <LinearProgress
            variant="determinate"
            value={parseFloat(delayData.min_temp)}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": { backgroundColor: "#00bcd4" },
            }}
          />
        </Box>
        <Typography variant="body1">{delayData.min_temp}%</Typography>
      </Box>
    </CardContent>
  );
};

export default Delay;
