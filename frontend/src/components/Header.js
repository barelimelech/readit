import React ,
 { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import classes from './Header.module.css'

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import {BsFillPersonFill} from "react-icons/bs"
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Menu from './Menu/Menu';

//Contexts
import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";

import { Typography, Button, StyledEngineProvider,Drawer, List,ListItemButton,ListItem,  ListItemIcon,ListItemText } from "@mui/material";

import BurgerSidebarMenu from "./Menu/BurgerSidebarMenu";
import MenuIcon from "@mui/icons-material/Menu";
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


 
  const handleWordClick = (word) => {
    console.log("Clicked word:", word);
    // Perform any desired action with the clicked word
  };

  // const [drawerState, setDrawerState] = React.useState({
  //   top: false,
  //   left: false,
  //   bottom: false,
  //   right: false,
  // });

  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }

  //   setDrawerState({ ...drawerState, [anchor]: open });
  // };

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
            
                // <MenuItem style={{ color: "white" }}>
                //   <BurgerSidebarMenu
                //     words={words}
                //     onWordClick={handleWordClick}
                //   />
                // </MenuItem>
                <Menu/>

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
