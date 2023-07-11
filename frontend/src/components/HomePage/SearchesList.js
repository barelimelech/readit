import React, { useContext, useState } from "react";
import { List, ListItem, ListItemText, Grid, Box, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Search from "./Search";
import SearchContext from "../../contexts/SearchContext";
import image from "../../Images/background.jpg";
import classes from "./SearchList.module.css";

const SearchesList = (props) => {
  const { searchResults } = useContext(SearchContext);
  const { globlSearchTerm } = useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState(globlSearchTerm);

  return (
    <div className="container contact__container">
      <Grid
        container
        alignItems="center"
        display="flex"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Search />
        </Grid>

        <h2 style={{ textAlign: "center" }}>Search Results</h2>
        <Grid item xs={12}>
          <List>
            {searchResults.map((result) => (
              <ListItem key={result.cacheId} alignItems="flex-start">
                <ListItemText
                  primary={
                    <a
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.title}
                    </a>
                  }
                  secondary={result.snippet}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <h1>Explore other options</h1>
        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              border: "1px dashed grey",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
           
          >
            <a
              href={`https://www.google.com/search?q=${globlSearchTerm}`}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "large" }}
            >
              Google
            </a>
            <a
              href={`https://www.bing.com/search?q=${globlSearchTerm}`}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "large" }}
            >
              Bing
            </a>

            <a
              href={`https://www.mojeek.com/search?q=${globlSearchTerm}`}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "large" }}
            >
              mojeek
            </a>

            <a
              href={`https://search.yahoo.com/search?p=${globlSearchTerm}`}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "large" }}
            >
              yahoo
            </a>

            <a
              href={`https://search.brave.com/search?q=${globlSearchTerm}`}
              target="_blank"
              rel="noreferrer"
              style={{fontSize: "large" ,pointerEvents: "none", cursor: "default"}}
            >
              brave
            </a>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchesList;
