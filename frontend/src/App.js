import { BrowserRouter, Route, Routes } from "react-router-dom";

import Searches from "./components/Searches";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";
import Register from "./components/Register";
import History from "./components/History";
// import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Searches />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/history" element={<History />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
