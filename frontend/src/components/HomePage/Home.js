import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Search from "./Search";
import Login from "../Authentication/Login";
import image from "../../Images/background.jpg";

//Contexts
import StateContext from "../../contexts/StateContext";
import DispatchContext from "../../contexts/DispatchContext";
import SearchContext from "../../contexts/SearchContext";

import { Container, Paper, Box, Grid, Typography } from "@mui/material";
const Home = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const GlobalState = useContext(StateContext);

  //console.log("is logged in  " + isLoggedIn);

  return (
    <div>
     
     {GlobalState.userIsLogged ? <Search /> : <Login/>}
        {/* Your content goes here */}
        {/* <Box  sx={{backgroundColor: "white"}}> <Search /></Box> */}
        
     
    </div>
  );
};

export default Home;
