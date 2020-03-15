import React, { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  CircularProgress,
  IconButton,
  Link
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink as RouterLink } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useAuth } from "react-use-auth";
import About from "./About";

const useStyles = makeStyles(theme => ({
  navigation: {
    flexBasis: 0,
    marginLeft: "auto",
    color: "white"
  },
  button: {
    textTransform: "none",
    color: "white"
  },
  link: {
    textTransform: "none",
    color: "white",
    opacity: 0.5,
    "&:hover": {
      opacity: 1
    }
  },
  activeLink: {
    opacity: 1
  }
}));

export const Navigation = () => {
  const classes = useStyles();
  const { isAuthenticated, login, logout, user, isAuthenticating } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Grid
        container
        className={classes.navigation}
        spacing={2}
        alignItems="center"
        justify="flex-end"
        wrap="nowrap"
      >
        <Grid item>
          <Button
            className={classes.link}
            component={RouterLink}
            to="/"
            activeClassName={classes.activeLink}
            exact
          >
            <Typography color="inherit">Generator</Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.link}
            component={RouterLink}
            to="gallery"
            activeClassName={classes.activeLink}
            exact
          >
            <Typography color="inherit">Gallery</Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.link}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <Typography color="inherit">About</Typography>
          </Button>
        </Grid>
        <Grid item>
          {isAuthenticating ? (
            <CircularProgress color="inherit" />
          ) : isAuthenticated() ? (
            <IconButton
              className={classes.navigation}
              color="inherit"
              aria-label="Menu"
            >
              <AccountCircleIcon />
            </IconButton>
          ) : (
            <Button variant="outlined" color="inherit" onClick={login}>
              Login
            </Button>
          )}
        </Grid>
        <Grid item>
          <IconButton
            className={classes.navigation}
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
