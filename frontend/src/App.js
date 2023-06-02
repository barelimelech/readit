import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useImmerReducer } from "use-immer";

import Searches from "./components/HomePage/SearchesList";
import Home from "./components/HomePage/Home";
import Login from "./components/Authentication/Login";
import Header from "./components/Header";
import Register from "./components/Authentication/Register";
import Histoty from './components/Menu/History'
// import logo from "./logo.svg";
import "./App.css";

//Contexts
import DispatchContext from './contexts/DispatchContext';
import StateContext from './contexts/StateContext';
import Profile from "./components/Profile/Profile";
import ProfileUpdate from "./components/Profile/ProfileUpdate";


function App() {

  const initialState = {
    userUsername: localStorage.getItem("theUserUsername"),
    userEmail: localStorage.getItem("theUserEmail"),
    userId: localStorage.getItem("theUserId"),
    userToken: localStorage.getItem("theUserToken"),
    userIsLogged: localStorage.getItem("theUserUsername") ? true : false,
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchToken":
        draft.userToken = action.tokenValue;
        break;
      case "userSignsIn":
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


  useEffect(() => {
    if (state.userIsLogged) {
      localStorage.setItem("theUserUsername", state.userUsername);
      localStorage.setItem("theUserEmail", state.userEmail);
      localStorage.setItem("theUserId", state.userId);
      localStorage.setItem("theUserToken", state.userToken);
    } else {
      localStorage.removeItem("theUserUsername");
      localStorage.removeItem("theUserEmail");
      localStorage.removeItem("theUserId");
      localStorage.removeItem("theUserToken");
    }
  }, [state.userIsLogged]);
  return (
    <StateContext.Provider value={state}>

    <DispatchContext.Provider value={dispatch}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Searches />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateprofile" element={<ProfileUpdate />} />
        
        {/* <Route path="/history" element={<History />} /> */}
      </Routes>
    </BrowserRouter>
    </DispatchContext.Provider>
    </StateContext.Provider>

  );
}

export default App;
