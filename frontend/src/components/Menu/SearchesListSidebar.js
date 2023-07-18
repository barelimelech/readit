import React, { useState, useContext } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItem,
  Button,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  AiFillDelete,
  AiFillDislike,
  AiFillLike,
  AiOutlineHistory,
} from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";


//Contexts
import StateContext from "../../contexts/StateContext";


const SearchesListSidebar = (props) => {
  const [openList, setOpenList] = useState(false);
  const GlobalState = useContext(StateContext);

  const handleClickList = () => {
    setOpenList(!openList);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 1000,
        bgcolor: "background.paper",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClickList}>
        <ListItemIcon>
          {props.type === "History" && <AiOutlineHistory />}
          {props.type === "Upcoming" && <MdWatchLater />}
        </ListItemIcon>
        <ListItemText primary={props.type} />
        {openList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.searchList.map(
            (item) =>
              String(item.user) === String(GlobalState.userId) &&
              item.isNew === props.isNew && (
                <div
                  key={item.id}
                  style={{
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: "4px",
                    margin: "4px 9",
                  }}
                >
                  <div>
                    <ListItem>
                      <Button
                        onClick={() => props.handelWordDelete(item)}
                        style={{ minWidth: "40px" }}
                      >
                        <AiFillDelete />
                      </Button>
                      <Button
                        onClick={() => props.handelWordToUpcoming(item)}
                        style={{ minWidth: "40px" }}
                      >
                        <AiFillLike />
                      </Button>
                      {/* <Typography noWrap> */}

                      <span
                        component="button"
                        onClick={() => props.handleWordClick(item.text)}
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: "large",
                        }}
                      >
                        {item.text}
                      </span>
                      {/* </Typography> */}
                    </ListItem>
                  </div>

                  {/* {item.isNew === true && <p>No history yet...</p>} */}
                </div>
              )
          )}
        </List>
      </Collapse>
    </List>
  );
};

export default SearchesListSidebar;
