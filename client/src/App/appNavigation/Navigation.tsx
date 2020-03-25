import React, { useState } from "react";
import {
  Grid,
  Button,
  CircularProgress,
  IconButton,
  Link,
  Menu,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink as RouterLink } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
import PersonIcon from "@material-ui/icons/Person";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { fade } from "@material-ui/core/styles/colorManipulator";

import { useAuth } from "react-use-auth";
import About from "./About";

const useStyles = makeStyles(theme => ({
  navigation: {},
  button: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    fontWeight: 300,
    fontSize: "1rem",
    textTransform: "none",
    "&:hover": {
      textDecoration: "underline",
      backgroundColor: fade(theme.palette.primary.contrastText, 0.04)
    }
  },
  profileButton: {
    fontWeight: 300,
    fontSize: "1rem",
    textTransform: "none",
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.contrastText, 0.04)
    }
  },
  activeLink: {
    backgroundColor: fade(theme.palette.primary.contrastText, 0.04)
  },
  light: {}
}));

export const Navigation = () => {
  const classes = useStyles();
  const { isAuthenticated, login, logout, user, isAuthenticating } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid
        container
        className={classes.navigation}
        spacing={2}
        alignItems="center"
        justify="flex-end"
      >
        <Grid item>
          <Button
            component={RouterLink}
            className={classes.button}
            color="inherit"
            to="/"
            activeClassName={classes.activeLink}
            exact
          >
            Generator
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={RouterLink}
            className={classes.button}
            color="inherit"
            to="gallery"
            activeClassName={classes.activeLink}
            exact
          >
            Gallery
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            color="inherit"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            About
          </Button>
        </Grid>
        <Grid item>
          {isAuthenticating ? (
            <CircularProgress color="inherit" />
          ) : isAuthenticated() ? (
            <>
              <Button
                className={classes.profileButton}
                color="inherit"
                aria-label="Menu"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <PersonIcon />
                Profile
                <ArrowDropDownIcon />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>{user.name}</MenuItem>
                <MenuItem onClick={handleClose}>My fractals</MenuItem>
                <MenuItem onClick={handleClose}>Account settings</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              onClick={login}
              className={classes.button}
            >
              Login
            </Button>
          )}
        </Grid>
        <Grid item>
          <IconButton
            color="inherit"
            aria-label="Github"
            component={Link}
            href="https://github.com/mcalus3/open-fraksl"
          >
            <GitHubIcon />
          </IconButton>
        </Grid>
      </Grid>
      <About
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
};
