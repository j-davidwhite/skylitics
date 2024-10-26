// SearchBar.js
import React from "react";
import "./Searchbar.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      className="search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" className="search-icon-container">
            <SearchIcon className="search-icon" />
          </InputAdornment>
        ),
        classes: {
          notchedOutline: "no-outline",
        },
      }}
    />
  );
};

export default SearchBar;
