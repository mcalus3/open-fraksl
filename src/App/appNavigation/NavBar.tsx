import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Hidden
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

import MenuDrawer from "./MenuDrawer";

const packageJson = require("../../../package.json");
const name = packageJson.name;

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  fab: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2),
    backgroundColor: "lightGrey",
    opacity: 0.5
  }
}));

function NavBar() {
  const classes = useStyles();
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <Hidden mdDown>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => setDrawerVisible(!drawerVisible)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              {name}
            </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Hidden lgUp>
        <IconButton
          className={classes.fab}
          onClick={() => setDrawerVisible(!drawerVisible)}
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
      <MenuDrawer
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
      />
    </>
  );
}

export default NavBar;
