import React, { useState } from "react";
import { Autocomplete, Button, Box } from "@mui/material";
import { TextField, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

// var KEY = 'AIzaSyA2q8MGCoPBhqqTxsUo-w1sUscgu9H9DQE'
// var CX = '858f2fc5425274d63'
const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // fetch("https://www.googleapis.com/customsearch/v1?key={AIzaSyA2q8MGCoPBhqqTxsUo-w1sUscgu9H9DQE}&cx={858f2fc5425274d63}&q=" + searchTerm)
    // .then(response => response.json())
    // .then(response => {
    //     // this.setState({ results: response.items });
    //     console.log(response.items);
    // });
    // console.log(searchTerm);
    // onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        // alignItems="center"
        width="500px" // Adjust the width as desired
      >
        <TextField
          label="Search something..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyPress={handleKeyPress}
        />
        {/* <IconButton onClick={handleSearch}></IconButton> */}

        {/* <Autocomplete
          //   freeSolo
          options={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <SearchIcon color="disabled" sx={{ marginRight: 1 }} />
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          )}
        /> */}
        <Box margin="auto" marginTop={1}>
          <Button
            value={searchTerm}
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
        <Box margin="auto" marginTop={1}>
          <Button variant="contained" color="secondary" marginLeft={1}>
            Search Later
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
