import { BrowserRouter, Route, Routes } from "react-router-dom";

import Searches from "./components/Searches";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";
import Register from "./components/Register";
import History from './components/History';
// import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    // <div>
    //   hello
    //   </div>
    
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Searches />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<History />} />

      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>

    //   </header>
    // </div>
  );
}

export default App;
