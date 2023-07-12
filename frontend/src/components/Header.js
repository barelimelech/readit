import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

import classes from "./Header.module.css";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import { BsFillPersonFill } from "react-icons/bs";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Menu from "./Menu/Menu";
import Sidebar from "./Menu/Sidebar";
import NewSidebar from './Menu/NewSidebar';
//Contexts
import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";
import SearchContext from "../contexts/SearchContext";
import GlobalContext from "../contexts/GlobalContext";

import {
  Typography,
  Button,
  StyledEngineProvider,
  
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const Header = (props) => {
  const navigate = useNavigate();
  const address = useContext(GlobalContext);

  const [showMenu, setShowMenu] = useState(false);
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);
  const { globlSearchTerm, setGloblSearchTerm } = useContext(SearchContext);
const theme = createTheme({
  palette: {
    primary: {
      main: "#a0569a",
      darker: "#d68bd0",
      default: "#fce1fa",
    },
  },
});
  useEffect(() => {
    if (showMenu) {
      console.log("showMenu  " + showMenu);
    }
  }, [showMenu]);

  const handleWordClick = (word) => {
    console.log("Clicked word:", word);
    // Perform any desired action with the clicked word
  };

  async function handleLogout() {
    const confirmLogout = window.confirm("Are you sure you want to leave?");
    if (confirmLogout) {
      try {
        const response = await Axios.post(
          `http://${address.localhostIP}/api-auth-djoser/token/logout/`,
          GlobalState.userToken,
          { headers: { Authorization: "Token ".concat(GlobalState.userToken) } }
        );
        setGloblSearchTerm("");
        GlobalDispatch({ type: "logout" });
        navigate("/");
        // setOpenSnack(true);
      } catch (e) {}
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <StyledEngineProvider injectFirst>
          <Box
            sx={{
              flexGrow: 100,
              background:
                "linear-gradient(-45deg, #f3b4a1, #f097b9, #96d7ef, #b1e7da)",
            }}
          >
            <AppBar position="static">
              <Toolbar>
                {GlobalState.userIsLogged && props.isMobile && (
                  <Menu style={{ width: "-webkit-fill-available" }} />
                )}

                {/* {GlobalState.userIsLogged && (
                // <MenuItem style={{ color: "white" }}>
                //   <BurgerSidebarMenu
                //     words={words}
                //     onWordClick={handleWordClick}
                //   />
                // </MenuItem>
                //  <Menu />
                //  <NewSidebar/>
                // <Sidebar/>
              )} */}
                <MenuItem
                  color="inherit"
                  onClick={() => {
                    setGloblSearchTerm("");
                    navigate("/");
                  }}
                  style={{ textTransform: "none" }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ flexGrow: 1, fontFamily: "Lobster Two, cursive" }}
                  >
                    {/* <img src={logo} style={{height:35, width:120}}></img> */}
                    lateread
                  </Typography>
                </MenuItem>
                {GlobalState.userIsLogged && (
                  <MenuItem
                    className={classes.alignRight}
                    key={"tmp"}
                    onClick={() => navigate("/profile")}
                  >
                    <BsFillPersonFill />
                  </MenuItem>
                )}
                {GlobalState.userIsLogged ? (
                  <Button
                    sx={{ marginLeft: "auto" }}
                    color="inherit"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    sx={{ marginLeft: "auto" }}
                    color="inherit"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                )}
              </Toolbar>
            </AppBar>
          </Box>
        </StyledEngineProvider>
        {/* </ClickAwayListener> */}
      </div>
    </ThemeProvider>
  );
};

export default Header;
