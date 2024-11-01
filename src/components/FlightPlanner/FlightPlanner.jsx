import React, { useState } from "react";
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

const FlightPlanner = ({ isLightMode, onPredict }) => {
  const [destinationCity, setDestinationCity] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handlePredict = async () => {
    const destination = getDestinationAcronym(destinationCity);
    const date = selectedDate.format("YYYY-MM-DD");
    console.log("Button clicked, making API request...");
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        destination,
        date,
      });
      onPredict(response.data, destination);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  const getDestinationAcronym = (city) => {
    switch (city) {
      case "Brisbane":
        return "BNE";
      case "Perth":
        return "PER";
      case "Sydney":
        return "SYD";
      default:
        return "MLB";
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
              onChange={(newDate) => setSelectedDate(newDate)}
              renderInput={(params) => <TextField {...params} />}
              orientation="landscape"
              minDate={dayjs()}
            />
          </LocalizationProvider>
        </div>

        <div className="flight-planner-middle">
          <div className="trip-details">
            <h2>MLB</h2>------------------
            <img
              src={isLightMode ? PlaneIcon : PlaneIconDark}
              className="PlaneIcon"
              alt="Plane Icon"
            />
            ------------------
            <h2>{getDestinationAcronym(destinationCity)}</h2>
          </div>
        </div>

        <div className="flight-planner-right">
          <TextField
            className="destination-select"
            id="standard-select-destination"
            select
            label="Destination City"
            value={destinationCity}
            onChange={(e) => setDestinationCity(e.target.value)}
            helperText="Select your destination"
            variant="standard"
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
