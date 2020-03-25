import React, { useState, useEffect } from "react";
import {
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
  Typography,
  Hidden
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

import { Navigation } from "./Navigation";

const packageJson = require("../../../package.json");
const name = packageJson.name;

const useStyles = makeStyles(theme => ({
  brand: {
    marginRight: "auto",
    fontWeight: 300,
    flexShrink: 0
  }
}));

export function AppBar() {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);

  // Canvas resizes iself after registering window resize event and expanding navbar affects the canvas so we should fire it
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [menuOpen]);

  return (
    <MuiAppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" className={classes.brand}>
          {name}
        </Typography>
        <Hidden xsDown>
          <Navigation />
        </Hidden>
        <Hidden smUp>
          <IconButton
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
