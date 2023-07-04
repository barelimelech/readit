import React, { useContext, useState } from "react";
import { List, ListItem, ListItemText, Grid, Box, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Search from "./Search";
import SearchContext from "../../contexts/SearchContext";
import image from "../../Images/background.jpg";

const SearchesList = (props) => {
  const { searchResults } = useContext(SearchContext);
  const { globlSearchTerm } = useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState(globlSearchTerm);

  return (
    <div>
      <Grid
        container
        alignItems="center"
        display="flex"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Search />
        </Grid>

        <h2 style={{ textAlign: "center" }}>
          Search Results for {globlSearchTerm}
        </h2>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
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
        <Grid
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
          marginLeft="200px"
          marginRight="200px"
          marginBottom="200px"
        >
          <Box
            sx={{ p: 2, border: "1px dashed grey" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="10px"
          >
            <a
              href={`https://www.bing.com/search?q=${globlSearchTerm}`}
              target="_blank"
              rel="noreferrer"
            >
              Bing
            </a>

            <a
              href={`https://www.mojeek.com/search?q=${globlSearchTerm}`}
              target="_blank"
              rel="noreferrer"
            >
              mojeek
            </a>

            <a
              href={`https://search.yahoo.com/search?p=${globlSearchTerm}`}
              target="_blank"
              rel="noreferrer"
            >
              yahoo
            </a>

            <a
              href={`https://search.brave.com/search?q=${globlSearchTerm}`}
              target="_blank"
              rel="noreferrer"
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
