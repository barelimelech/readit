import React, { useState, useEffect } from "react";
import "./BurgerSidebarMenu.css";
import { Button, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AiFillDelete, AiFillDislike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import Axios from "axios";

const BurgerSidebarMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".burger-sidebar-menu")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleWordClick = (word) => {
    if (props.onWordClick) {
      props.onWordClick(word);
    }
  };

  useEffect(() => {
    async function getAllSearches() {
      try {
        const response = await Axios.get(`http://localhost:8000/api/searches/`);
        console.log(response.data)
        setSearchList(response.data);
        // dispatch({
        //   type: "catchUserProfileInfo",
        //   profileObject: response.data,
        // });
        // dispatch({ type: "loadingDone" });
      } catch (e) {
        console.log("serxheslist error : " + e)

      }
    }
    getAllSearches();
  }, []);

  return (
    <div className={`burger-sidebar-menu ${isOpen ? "open" : ""}`}>
      <Button
        className="burger-button"
        onClick={handleToggle}
        style={{ color: "white" }}
      >
        <MenuIcon className="burger-icon"></MenuIcon>
      </Button>
      <div className="sidebar-content">
        <h3 style={{ color: "black" }}>Upcoming</h3>
        <ul style={{ overflowY: "scroll", maxHeight: "350px", color: "black" }}>
          {searchList.map((word) => (
            <div>
              <p
                key={word}
                onClick={() => handleWordClick(word)}
                style={{
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "4px",
                  margin: "4px 9",
                  background: "#c4ddf2",
                }}
              >
                <AiFillDislike />

                {word}
              </p>
            </div>
          ))}
        </ul>
        <p
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "black",
            margin: "10px 0",
          }}
        />
        <h3 style={{ color: "black" }}>History</h3>
        <ul style={{ overflowY: "scroll", maxHeight: "350px", color: "black" }}>
          {props.words.map((word, index) => (
            <p
              key={index}
              onClick={() => handleWordClick(word)}
              style={{
                cursor: "pointer",
                padding: "8px",
                borderRadius: "4px",
                margin: "4px 0",
                background: "#c4ddf2",
              }}
            >
              <AiFillDelete />
              {word}
            </p>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BurgerSidebarMenu;
