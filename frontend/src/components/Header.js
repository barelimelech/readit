import { useState, useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useImmerReducer } from "use-immer";
import Axios from "axios";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";

//Contexts

import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";

import {
  Grid,
  Typography,
  Button,
  StyledEngineProvider,
} from "@mui/material";

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
              <Typography>
                <BurgerSidebarMenu
                  words={words}
                  onWordClick={handleWordClick}
                />
              </Typography>
              <Button
                sx={{ marginLeft: "35px" }}
                color="inherit"
                onClick={() => navigate("/")}
                style={{ textTransform: "none" }}
              >
                <Grid>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    readit
                  </Typography>
                </Grid>
              </Button>
              <MenuItem key={"tmp"} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">TMP</Typography>
              </MenuItem>
              {GlobalState.userIsLogged? (
                <MenuItem key={"tmp"} onClick={handleLogout}>
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              ) : (
                <Button
                  sx={{ marginLeft: "auto" }}
                  color="inherit"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
              {/* {isLoggedIn && <Button color="inherit">Profile</Button>} */}
              {/* <MenuItem key={"tmp"} onClick={handleLogout}>
                <Typography textAlign="center">Log out</Typography>
              </MenuItem> */}
            </Toolbar>
          </AppBar>
        </Box>
      </StyledEngineProvider>
      {/* </ClickAwayListener> */}
    </div>
  );
};

export default Header;
