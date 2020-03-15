import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Hidden,
  Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

import MenuDrawer from "./MenuDrawer";
import { useAuth } from "react-use-auth";

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
  },
  loginFab: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2) + 260,
    backgroundColor: "lightGrey",
    opacity: 0.5
  },
  white: { color: "white", marginLeft: "auto" }
}));

function NavBar() {
  const classes = useStyles();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { isAuthenticated, login, logout, user } = useAuth();

  const userButton = isAuthenticated() ? (
    <Button onClick={logout} className={classes.white}>
      {user.name}
    </Button>
  ) : (
    <Button onClick={login} className={classes.white}>
      Login
    </Button>
  );

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
            {userButton}
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
        <div className={classes.loginFab}>{userButton}</div>
      </Hidden>
      <MenuDrawer
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
      />
    </>
  );
}

export default NavBar;
