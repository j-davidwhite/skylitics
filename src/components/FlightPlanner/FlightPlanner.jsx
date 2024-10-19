import React, { useState } from "react";
import "./FlightPlanner.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import FlightTakeoffSharpIcon from "@mui/icons-material/FlightTakeoffSharp";
import FlightLandSharpIcon from "@mui/icons-material/FlightLandSharp";
import PlaneIcon from "../../assets/worldwide.png";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const FlightPlanner = () => {
  const [destinationCity, setDestinationCity] = useState("");

  const getDestinationAcronym = (city) => {
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

  return (
    <div className="flight-planner">
      <form className="flight-planner-form" noValidate autoComplete="off">
        <TextField
          className="departure-select"
          id="standard-select-city"
          select
          label="Departure City"
          value="Melbourne" // Default locked value
          helperText="This field is locked"
          variant="standard"
          disabled // Disable the select field
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
        <div className="trip-details">
          <h2>MLB</h2> ------------------
          <img src={PlaneIcon} className="PlaneIcon" />
          ------------------
          <h2>{getDestinationAcronym(destinationCity)}</h2>
        </div>
        <TextField
          className="destination-select"
          id="standard-select-destination"
          select
          label="Destination City"
          value={destinationCity} // Track selected city with state
          onChange={(e) => setDestinationCity(e.target.value)} // Handle selection
          helperText="Please select your destination"
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
      </form>
    </div>
  );
};

export default FlightPlanner;
