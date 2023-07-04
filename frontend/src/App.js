import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import { Container, Paper, Box, Grid, Typography } from "@mui/material";

import SearchesList from "./components/HomePage/SearchesList";
import Home from "./components/HomePage/Home";
import Login from "./components/Authentication/Login";
import Header from "./components/Header";
import Register from "./components/Authentication/Register";
import Histoty from "./components/Menu/History";
import AccountCreated from "./components/Authentication/AccountCreated";
// import logo from "./logo.svg";
import "./App.css";

import image from "./Images/background.jpg";
//Contexts
import DispatchContext from "./contexts/DispatchContext";
import StateContext from "./contexts/StateContext";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import SearchContext from "./contexts/SearchContext";
import Sidebar from './components/Menu/Sidebar';

function App() {
  const initialState = {
    userFirstName: localStorage.getItem("theUserFirstName"),
    userLastName: localStorage.getItem("theUserLastName"),
    userUsername: localStorage.getItem("theUserUsername"),
    userEmail: localStorage.getItem("theUserEmail"),
    userId: localStorage.getItem("theUserId"),
    userToken: localStorage.getItem("theUserToken"),
    userIsLogged: localStorage.getItem("theUserUsername") ? true : false,
    // userIsStaff: localStorage.getItem("theUserIsStaff") 
  };
  const users = [
    "avia",
    "amit",
    "bar",
    "gal",
    "adam",
    "shalom",
    "talya",
    "zohar",
  ];

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchToken":
        draft.userToken = action.tokenValue;
        break;
      case "userSignsIn":
        draft.userFirstName = action.firstNameInfo;
        draft.userLastName = action.lastNameInfo;
        draft.userUsername = action.usernameInfo;
        draft.userEmail = action.emailInfo;
        draft.userId = action.IdInfo;
        draft.userIsLogged = true;
        break;
      case "logout":
        draft.userIsLogged = false;
        break;
      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);
  const [searchResults, setSearchResults] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [globlSearchTerm, setGloblSearchTerm] = useState("");
  const [globalSearchBtn, setGlobalSearchBtn] = useState(false);

  useEffect(() => {
    if (state.userIsLogged) {
      localStorage.setItem("theUserFirstName", state.userFirstName);
      localStorage.setItem("theUserLastName", state.userLastName);
      localStorage.setItem("theUserUsername", state.userUsername);
      localStorage.setItem("theUserEmail", state.userEmail);
      localStorage.setItem("theUserId", state.userId);
      localStorage.setItem("theUserToken", state.userToken);
    } else {
      localStorage.removeItem("theUserFirstName");
      localStorage.removeItem("theUserLastName");
      localStorage.removeItem("theUserUsername");
      localStorage.removeItem("theUserEmail");
      localStorage.removeItem("theUserId");
      localStorage.removeItem("theUserToken");
    }
  }, [state.userIsLogged]);
  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            <SearchContext.Provider
              value={{
                searchResults,
                setSearchResults,
                searchList,
                setSearchList,
                globlSearchTerm,
                setGloblSearchTerm,
                globalSearchBtn,
                setGlobalSearchBtn,
              }}
            >
              <BrowserRouter>
                <div
                  style={{
                    position: "fixed",
                    opacity: 1,
                    width: "100%",
                  }}
                >
                  <Header />
                </div>

                <div>
                  <img
                    src={image}
                    alt="my background"
                    style={{
                      filter: "brightness(90%) opacity(0.3)",
                      position: "fixed",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      zIndex: "-1",
                    }}
                  />
                  {/* <img src={image} alt="my background" style={{ filter: 'brightness(50%) opacity(0.5)', height: "auto", width: "99.99%" }} /> */}
                  <div
                    style={{
                      top: "100px",
                      left: "20px",
                      textAlign: "center",
                      zIndex: "100",
                      width: "100%",
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/results" element={<SearchesList />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/updateprofile" element={<EditProfile />} />
                      <Route path="/created" element={<AccountCreated />} />

                      {/* <Route path="/history" element={<History />} /> */}
                    </Routes>
                  </div>
                </div>
              </BrowserRouter>
            </SearchContext.Provider>
          </DispatchContext.Provider>
        </StateContext.Provider>
      </div>
      <div>
        <footer
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            backgroundColor: "#f5f5f5",
            padding: "20px",
          }}
        >
          <Grid container justify="center" alignItems="center">
            <Typography variant="body2" color="textSecondary">
              © 2023 BAE Website. All rights reserved.
            </Typography>
          </Grid>
        </footer>
      </div>
    </div>
  );
}

export default App;
