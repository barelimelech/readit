import React, { useState, useContext, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

import Popup from "../Popup";
//Contexts
import StateContext from "../../contexts/StateContext";
import DispatchContext from "../../contexts/DispatchContext";
import SearchContext from "../../contexts/SearchContext";
import GlobalContext from "../../contexts/GlobalContext";

import classes from "./Search.module.css";
import {
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  Alert,
  Grid,
  List,
  ListItem,
  ListItemText,
  StyledEngineProvider,
} from "@mui/material";

const Search = ({ props }) => {
  const navigate = useNavigate();
  const address = useContext(GlobalContext);

  // const [searchTerm, setSearchTerm] = useState("");
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);
  const [showPopup, setShowPopup] = useState(false);
  const [searchBtn, setSerachBtn] = useState(false);
  const [searchLaterBtn, setSerachLaterBtn] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [textError, setTextError] = useState("");

  // const [searchResults, setSearchResults] = useState([]);
  const { setSearchResults } = useContext(SearchContext);
  const { searchList, setSearchList } = useContext(SearchContext);
  const { globlSearchTerm, setGloblSearchTerm } = useContext(SearchContext);
  const { globalSearchBtn, setGlobalSearchBtn } = useContext(SearchContext);
  const [showLaterReadPopup, setShowLaterReadPopup] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);

  const handleSaveLink = () => {
    document.getElementById("pasteButton").addEventListener("click", function() {
  navigator.clipboard.readText()
    .then(function(text) {
      var pasteOutput = document.getElementById("pasteOutput");
      pasteOutput.value = text;
    })
    .catch(function(err) {
      console.error("Failed to read clipboard text: ", err);
    });


  })};
  const handleSearchLater = () => {
    if (!GlobalState.userIsLogged) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
      setSerachLaterBtn(true);
      setShowLaterReadPopup(true);
    }
  };

  const handleSearch = async (word) => {
    if (!GlobalState.userIsLogged) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
      setSerachBtn(true);
      setGlobalSearchBtn(true);
      setShowSearchPopup(true);
      navigate(`/results?q=${word}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleLaterReadClosePopup = () => {
    setShowLaterReadPopup(false);
  };
  const handleSearchClosePopup = () => {
    setShowSearchPopup(false);
  };

  useEffect(() => {
    if ((searchBtn || globalSearchBtn) && globlSearchTerm !== "") {
      setHasError(false);
      setSerachBtn(false);
      setGlobalSearchBtn(false);
      async function addSearch() {
        const formData = new FormData();
        formData.append("user", GlobalState.userId);
        formData.append("text", globlSearchTerm);
        formData.append("isNew", false);
        formData.append("isDeleted", false);
        formData.append("timestamp", new Date().toISOString());

        try {
          const response = await Axios.post(
            `${address.localhostIP}/api/searches/upsert/`,
            formData
          );

          if (response.status === 201) {
            setSearchList((prevSearchList) => [
              response.data,
              ...prevSearchList,
            ]);
          } else if (response.status === 200) {
            const newState = searchList.map((obj) => {
              if (obj.id === response.data.id) {
                return { ...obj, isNew: false };
              }
              return obj;
            });
            setSearchList(newState);
            // setSearchList(response.data);
          }

          // const newElement = [...searchList, formData];
          // //setSearchList((searchList)=> [...searchList, formData]);
          //   setSearchList(newElement);
        } catch (error) {
          setHasError(true);
          if (
            error.response &&
            error.response.data &&
            error.response.data.text
          ) {
            // Error response data is not blank
            setTextError("the search is already exist");

            console.log(error.response.data.text);
          } else {
            // Error response data is blank or undefined
            setTextError("write something");

            console.log("Error response data is blank");
          }
        }
      }
      addSearch();
    }
  }, [searchBtn, globalSearchBtn, setSearchList, searchList]);

  useEffect(() => {
    if (searchLaterBtn && globlSearchTerm !== "") {
      setHasError(false);
      setSerachLaterBtn(false);
      async function addSearch() {
        const formData = new FormData();
        formData.append("user", GlobalState.userId);
        formData.append("text", globlSearchTerm);
        formData.append("isNew", true);
        formData.append("isDeleted", false);
        formData.append("timestamp", new Date().toISOString());

        try {
          const response = await Axios.post(
            `${address.localhostIP}/api/searches/upsert/`,
            formData
          );

          if (response.status === 201) {
            setSearchList((prevSearchList) => [
              ...prevSearchList,
              response.data,
            ]);
          } else if (response.status === 200) {
            const newState = searchList.map((obj) => {
              if (obj.id === response.data.id) {
                return { ...obj, isNew: true };
              }
              return obj;
            });
            setSearchList(newState);
            // setSearchList(response.data);
          }
        } catch (error) {
          setHasError(true);
          // if(error.response.data.text){

          //   setTextError("the search is already exist")
          // }
        }
      }
      addSearch();
    }
  }, [searchLaterBtn, setSearchList, searchList]);


  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      display="flex"
      justifyContent="center"
    >
      <Grid item xs={8}>
        <div className={classes.textfieldContainer}>
          {searchLaterBtn === true && globlSearchTerm === "" && (
            <Popup
              title={"Write something"}
              context={""}
              open={showLaterReadPopup}
              onClose={handleLaterReadClosePopup}
            />
          )}
          {searchBtn === true && globlSearchTerm === "" && (
            <Popup
              title={"Write something"}
              context={""}
              open={showSearchPopup}
              onClose={handleSearchClosePopup}
            />
          )}
          <TextField
            variant="outlined"
            fullWidth
            // style={{ margin: '16px 16px 8px' }}
            size="large"
            label="Search something..."
            value={globlSearchTerm}
            onChange={(event) => {
              setGloblSearchTerm(event.target.value);
            }}
            onKeyPress={handleKeyPress}
            InputProps={{
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              },
            }}
          />
        </div>
      </Grid>

      {hasError && <Alert severity="error">{textError}</Alert>}

      <Grid item xs={8}>
        <div className={classes.buttonContainer}>
          <Button
            fullWidth
            // style={{ margin: '16px 16px 8px' }}
            value={globlSearchTerm}
            variant="contained"
            color="primary"
            size="large"
            // style={{ borderColor: "#E8A0BF" }}
            onClick={() => handleSearch(globlSearchTerm)}
            sx={{
              borderColor: "black", // Change this to the desired color
              borderWidth: "20px", // Optional: You can adjust the width of the border
            }}
          >
            Search
          </Button>
        </div>

        {showPopup && (
          <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
            <DialogTitle>For search, log in first</DialogTitle>
            <DialogActions>
              <Button onClick={() => navigate("/login")}>Login</Button>
            </DialogActions>
          </Dialog>
        )}
      </Grid>

      <Grid item xs={8}>
        <div className={classes.buttonContainer}>
          <Button
            fullWidth
            // style={{ margin: '16px 16px 8px' }}
            value={globlSearchTerm}
            variant="outlined"
            size="large"
            color="primary"
            onClick={handleSearchLater}
          >
            Save For Later
          </Button>
          {/* <Button
            id="pasteButton"
            fullWidth
            // style={{ margin: '16px 16px 8px' }}
            value={globlSearchTerm}
            variant="outlined"
            size="large"
            color="primary"
            onClick={handleSaveLink}
          >
            Save link
          </Button>
          <textarea id="pasteTarget"></textarea> */}
          {globlSearchTerm !== "" && (
            <Popup
              title={"New Word Is Added"}
              context={"The search is added to your Upcoming."}
              open={showLaterReadPopup}
              onClose={handleLaterReadClosePopup}
            />
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default Search;
