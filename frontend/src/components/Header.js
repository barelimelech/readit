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
  Drawer,
  List,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import logo from '../Images/logo4.jpg';

import BurgerSidebarMenu from "./Menu/BurgerSidebarMenu";
import MenuIcon from "@mui/icons-material/Menu";
const Header = (props) => {
  const navigate = useNavigate();
  const address = useContext(GlobalContext);

  const [showMenu, setShowMenu] = useState(false);
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);
  const { globlSearchTerm, setGloblSearchTerm } = useContext(SearchContext);

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
    <div>
      <StyledEngineProvider injectFirst>
        <Box sx={{ flexGrow: 100 }}>
          <AppBar position="static">
            <Toolbar>
              {GlobalState.userIsLogged && props.isMobile && <Menu style={{width:"-webkit-fill-available"}}/>}

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
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, fontFamily: "Poppins, sans-serif" }}
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
  );
};

export default Header;
