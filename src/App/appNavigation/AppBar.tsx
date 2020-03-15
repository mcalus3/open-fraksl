import React, { useState } from "react";
import {
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
  Typography,
  Hidden,
  Button,
  Grid,
  Link,
  CircularProgress
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink as RouterLink } from "react-router-dom";
import About from "./About";

import { useAuth } from "react-use-auth";
import { makeStyles } from "@material-ui/core/styles";
import { Navigation } from "./Navigation";

const packageJson = require("../../../package.json");
const name = packageJson.name;

const useStyles = makeStyles(theme => ({
  menuIcon: {
    marginLeft: "auto",
    color: "white"
  }
}));

function AppBar() {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <MuiAppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          {name}
        </Typography>
        <Hidden xsDown>
          <Navigation />
        </Hidden>
        <Hidden smUp>
          <IconButton
            className={classes.menuIcon}
            color="inherit"
            aria-label="Menu"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      {menuOpen ? (
        <Hidden smUp>
          <Toolbar>
            <Navigation />
          </Toolbar>
        </Hidden>
      ) : null}
    </MuiAppBar>
  );
}

export default AppBar;
