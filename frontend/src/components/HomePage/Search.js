import React, { useState, useContext, useEffect } from "react";
import { Key, Search as SearchIcon } from "@mui/icons-material";
import PopupMessage from "./PopupMessage";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import SearchesList from "./SearchesList";
//Contexts
import StateContext from "../../contexts/StateContext";
import DispatchContext from "../../contexts/DispatchContext";
import SearchContext from "../../contexts/SearchContext";

import {
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Search = ({ onSearch }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);
  const [showPopup, setShowPopup] = useState(false);
  const [searchBtn, setSerachBtn] = useState(false);
  // const [searchResults, setSearchResults] = useState([]);
  const { setSearchResults } = useContext(SearchContext);

  const handleSearchLater = () => {
    if (!GlobalState.userIsLogged) {
      console.log("bar");
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    if (searchBtn) {
      const source = Axios.CancelToken.source();
      async function addSearch() {
        const formData = new FormData();
        formData.append("user", GlobalState.userId);
        formData.append("text", searchTerm);
        formData.append("isNew", true);
        formData.append("isDeleted", false);

        try {
          const response = await Axios.post(
            "http://localhost:8000/api/searches/create/",
            formData
          );
        } catch (error) {}
      }
      addSearch();
    }
  }, [searchBtn]);

  useEffect(() => {
    if (searchBtn) {
      const source = Axios.CancelToken.source();
      async function getSearchResults() {
        try {
          const apiKey = "AIzaSyAJmO8cYzZhBUym_dLJVXxVqzoEjSQxiwU";
          const cx = "858f2fc5425274d63";
          const numResults = 10; // Number of results to fetch
          const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchTerm}&num=${numResults}`;
          const response = await Axios.get(apiUrl);
          setSearchResults(response.data.items);
          navigate("/results");
        } catch (error) {}
      }
      getSearchResults();
    }
  }, [searchBtn]);

  const handleSearch = async () => {
    if (!GlobalState.userIsLogged) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
      // try {
      //   const apiKey = "AIzaSyAJmO8cYzZhBUym_dLJVXxVqzoEjSQxiwU";
      //   const cx = "858f2fc5425274d63";
      //   const numResults = 10; // Number of results to fetch

      //   const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchTerm}&num=${numResults}`;
      //   const response = await Axios.get(apiUrl);
      //   setSearchResults(response.data.items);
      //   navigate("/results");
      // } catch (error) {
      //   console.error("Error searching:", error);
      // }
      setSerachBtn(true);
    }
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
    <div>
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
          </Box>
          <Box margin="auto" marginTop={1}>
            <Button
              variant="contained"
              color="secondary"
              marginLeft={1}
              onClick={handleSearchLater}
            >
              Search Later
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Search;
