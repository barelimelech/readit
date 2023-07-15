import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import { Container, Paper, Box, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import SearchesList from "./components/HomePage/SearchesList";
import Home from "./components/HomePage/Home";
import Login from "./components/Authentication/Login";
import Header from "./components/Header";
import Register from "./components/Authentication/Register";
import Histoty from "./components/Menu/History";
import AccountCreated from "./components/Authentication/AccountCreated";
import WaitingList from "./components/Authentication/WaitingList";
// import logo from "./logo.svg";
import "./App.css";
import VideoBackgroundPage from "./components/VideoBackgroundPage";
import image from "./Images/background.jpg";
//Contexts
import DispatchContext from "./contexts/DispatchContext";
import StateContext from "./contexts/StateContext";
import GlobalContext from "./contexts/GlobalContext";

import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import SearchContext from "./contexts/SearchContext";
import Sidebar from "./components/Menu/Sidebar";
import MenuSidebar from "./components/Menu/SidebarWrapper";
import Menu from "./components/Menu/Menu";

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

  const [isMobile, setIsMobile] = useState(false);
 const theme = createTheme({
   palette: {
     primary: {
       main: "#a0569a",
       darker: "#d68bd0",
       default: "#fce1fa",
     },
   },
   typography: {
     fontFamily: "Roboto, sans-serif",
   },
 });
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the threshold as needed
    };

    // Call the handler on initial load
    handleResize();

    // Add a listener to update the state when the window is resized
    window.addEventListener("resize", handleResize);

    console.log("is mobile? " + isMobile);

    // Clean up the listener when the component is unmounted
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  // const initialAddress = { localhostIP: "lateread.com" };

  const initialAddress = window.location.host.includes("localhost")
    ? {
        localhostIP: "http://localhost:8000",
      }
    : { localhostIP: "https://lateread.com" };

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
  const [address, setAddress] = useState("");

  // const [sidebarWidth, setSidebarWidth] = useState(200); // Width of the sidebar

  // useEffect(() => {
  //   const handleResize = () => {
  //     const sidebar = document.querySelector(".sidebar-wrapper");
  //     const newSidebarWidth = sidebar ? sidebar.offsetWidth : 0;
  //     setSidebarWidth(newSidebarWidth);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize(); // Initial calculation

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

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
        <ThemeProvider theme={theme}>

    <div>
      <BrowserRouter>
        <GlobalContext.Provider value={initialAddress}>
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
                <div
                  style={{
                    display: "flex",
                    minHeight: "100vh",
                  }}
                >
                  {state.userIsLogged && !isMobile && <MenuSidebar />}
                  <div
                    style={{
                      flex: 1,
                      // paddingRight: `${sidebarWidth}px`, // Adjust the padding to account for the sidebar width
                    }}
                  >
                    <div
                      style={{
                        position: "fixed",
                        opacity: 1,
                        width: "-webkit-fill-available",
                        zIndex: "100",
                      }}
                    >
                      <Header isMobile={isMobile} />
                      {/* <VideoBackgroundPage /> */}
                    </div>

                    <div>
                      {/* <img
                        src={image}
                        alt="my background"
                        style={{
                          filter: "brightness(90%) opacity(0.3)",
                          position: "fixed",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "100%",
                        }}
                      /> */}
                      <div className="d-flex flex-column justify-content-center w-100 h-100">
                        <div className="d-flex flex-column justify-content-center align-items-center"></div>
                      </div>

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
                          <Route
                            path="/updateprofile"
                            element={<EditProfile />}
                          />
                          <Route path="/created" element={<AccountCreated />} />
                          <Route
                            path="/waitinglist"
                            element={<WaitingList />}
                          />

                          {/* <Route path="/history" element={<History />} /> */}
                        </Routes>
                      </div>
                      {/* <div>
                        <div
                          style={{
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
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </SearchContext.Provider>
            </DispatchContext.Provider>
          </StateContext.Provider>
        </GlobalContext.Provider>
      </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
