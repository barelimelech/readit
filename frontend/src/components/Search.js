import React, { useState, useContext } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import PopupMessage from "./PopupMessage";
import { useNavigate } from "react-router-dom";

//Contexts
import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";
import {
  Button, Box, TextField,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";

// var KEY = 'AIzaSyA2q8MGCoPBhqqTxsUo-w1sUscgu9H9DQE'
// var CX = '858f2fc5425274d63'
const Search = ({ onSearch }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);
  const [showPopup, setShowPopup] = useState(false);

  const handleSearch = () => {
    if (!GlobalState.userIsLogged) {
      console.log("bar");
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
    // fetch("https://www.googleapis.com/customsearch/v1?key={AIzaSyA2q8MGCoPBhqqTxsUo-w1sUscgu9H9DQE}&cx={858f2fc5425274d63}&q=" + searchTerm)
    // .then(response => response.json())
    // .then(response => {
    //     // this.setState({ results: response.items });
    //     console.log(response.items);
    // });
    // console.log(searchTerm);
    // onSearch(searchTerm);
  };

  // useEffect(()=>{
  //   if(tmp!==true){
  //     <PopupMessage/>

  //   }

  // },[tmp])

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
          {showPopup && (
            <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
              <DialogTitle>For search, log in first</DialogTitle>
              <DialogActions>
                <Button onClick={() => navigate("/login")}>Login</Button>
              </DialogActions>
            </Dialog>
          )}
          {/* {showPopup && <PopupMessage/>} */}
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
