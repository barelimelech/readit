import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import classes from './Header.module.css'

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import {BsFillPersonFill} from "react-icons/bs"

//Contexts
import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";

import { Typography, Button, StyledEngineProvider, Grid } from "@mui/material";

import BurgerSidebarMenu from "./Menu/BurgerSidebarMenu";

const Header = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);

  useEffect(() => {
    if (showMenu) {
      console.log("showMenu  " + showMenu);
    }
  }, [showMenu]);

  const handleCloseNavMenu = () => {};

  const words = [
    "apple",
    "banana",
    "cherry",
    "date",
    "elderberry",
    "fig",
    "grape",
    "apple",
    "banana",
    "cherry",
    "date",
    "elderberry",
    "fig",
    "grape",
  ];
  const handleWordClick = (word) => {
    console.log("Clicked word:", word);
    // Perform any desired action with the clicked word
  };

  async function handleLogout() {
    const confirmLogout = window.confirm("Are you sure you want to leave?");
    if (confirmLogout) {
      try {
        const response = await Axios.post(
          "http://localhost:8000/api-auth-djoser/token/logout/",
          GlobalState.userToken,
          { headers: { Authorization: "Token ".concat(GlobalState.userToken) } }
        );

        GlobalDispatch({ type: "logout" });
        navigate("/");
        // setOpenSnack(true);
      } catch (e) {}
    }
  }

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              {GlobalState.userIsLogged && (
                <MenuItem style={{ color: "white" }}>
                  <BurgerSidebarMenu
                    words={words}
                    onWordClick={handleWordClick}
                  />
                </MenuItem>
              )}
              <MenuItem
                color="inherit"
                onClick={() => navigate("/")}
                style={{ textTransform: "none" }}
              >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  readit
                </Typography>
              </MenuItem>
              {GlobalState.userIsLogged && (
                <MenuItem className={classes.alignRight} key={"tmp"}  onClick={() => navigate("/profile")}>
                  <BsFillPersonFill/>
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
  );
};

export default Header;
