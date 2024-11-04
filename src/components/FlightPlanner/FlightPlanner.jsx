import React, { useState, useEffect } from "react";
import "./FlightPlanner.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp";
import FlightLandSharpIcon from "@mui/icons-material/FlightLandSharp";
import PlaneIcon from "../../assets/worldwide.png";
import PlaneIconDark from "../../assets/worldwide1.png";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";

const FlightPlanner = ({
  isLightMode,
  onPredict,
  destinationCity,
  setDestinationCity,
}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Start with no date selected
  const [dateError, setDateError] = useState(false);
  const [cityError, setCityError] = useState(false);

  const handlePredict = async () => {
    if (!selectedDate) setDateError(true);
    if (!destinationCity) setCityError(true);

    // Only proceed if both fields are valid
    if (selectedDate && destinationCity) {
      const destinationWeatherKey = getDestinationWeatherKey(destinationCity);
      const destinationPriceKey = getDestinationPriceKey(destinationCity);
      const date = selectedDate.format("YYYY-MM-DD");

      try {
        // Make requests to both weather and price prediction endpoints
        const weatherResponse = await axios.post(
          "http://127.0.0.1:8000/predict_weather",
          {
            destination: destinationWeatherKey,
            date,
          }
        );

        const priceResponse = await axios.post(
          `http://127.0.0.1:8000/predict_price/${destinationPriceKey}`,
          {
            day_of_week_encoded: selectedDate.day(),
          }
        );

        onPredict(
          {
            ...weatherResponse.data,
            priceMelbourne: priceResponse.data.predicted_price.toFixed(2),
          },
          destinationCity
        );
      } catch (error) {
        console.error("Error fetching prediction:", error);
      }
    }
  };

  const getDestinationWeatherKey = (city) => {
    switch (city) {
      case "Brisbane":
        return "BNE";
      case "Perth":
        return "PER";
      case "Sydney":
        return "SYD";
      default:
        return "Destination";
    }
  };

  const getDestinationPriceKey = (city) => {
    switch (city) {
      case "Brisbane":
        return "PriceToBrisbane";
      case "Perth":
        return "PriceToPerth";
      case "Sydney":
        return "PriceToSydney";
      default:
        return "PriceToSydney";
    }
  };

  return (
    <div className={`flight-planner ${isLightMode ? "" : "dark"}`}>
      <form className="flight-planner-form" noValidate autoComplete="off">
        <div className="flight-planner-left">
          <TextField
            className="departure-select"
            id="standard-select-city"
            select
            label="Departure City"
            value="Melbourne"
            helperText="This field is locked"
            variant="standard"
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FlightTakeoffSharpIcon />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="Melbourne">Melbourne</MenuItem>
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newDate) => {
                setSelectedDate(newDate);
                setDateError(false); // Clear error when a date is selected
              }}
              renderInput={(params) => (
                <TextField
                  error={dateError} // Show red outline if dateError is true
                  helperText={dateError ? "Please select a date" : ""}
                />
              )}
              orientation="landscape"
              minDate={dayjs()}
            />
          </LocalizationProvider>
        </div>

        <div className="flight-planner-middle">
          <div className="trip-details">
            <h2>MLB</h2>
            ------------------
            <img
              src={isLightMode ? PlaneIcon : PlaneIconDark}
              className="PlaneIcon"
              alt="Plane Icon"
            />
            ------------------
            <h2>{getDestinationWeatherKey(destinationCity)}</h2>
          </div>
        </div>

        <div className="flight-planner-right">
          <TextField
            className="destination-select"
            id="standard-select-destination"
            select
            label="Destination City"
            value={destinationCity}
            onChange={(e) => {
              setDestinationCity(e.target.value);
              setCityError(false); // Clear error when a city is selected
            }}
            helperText={
              cityError
                ? "Please select a destination city"
                : "Select your destination"
            }
            variant="standard"
            error={cityError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FlightLandSharpIcon />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="Brisbane">Brisbane</MenuItem>
            <MenuItem value="Perth">Perth</MenuItem>
            <MenuItem value="Sydney">Sydney</MenuItem>
          </TextField>
          <div className="predict">
            <button type="button" onClick={handlePredict}>
              Get Prediction
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlightPlanner;
