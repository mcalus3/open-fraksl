import React, { useState } from "react";
import {
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
  Typography,
  Hidden,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

import { Navigation } from "./Navigation";

const packageJson = require("../../../package.json");
const name = packageJson.name;

const useStyles = makeStyles(theme => ({
  menuIcon: {
    marginLeft: "auto",
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
