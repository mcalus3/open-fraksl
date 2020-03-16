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
    cursor: "pointer",
    textTransform: "none",
    color: "white",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  activeLink: {
    textDecoration: "underline",
    fontWeight: "bold"
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
        spacing={4}
        alignItems="center"
        justify="flex-end"
        wrap="nowrap"
      >
        <Grid item>
          <RouterLink
            className={classes.link}
            to="/"
            activeClassName={classes.activeLink}
            exact
          >
            <Typography color="inherit">Generator</Typography>
          </RouterLink>
        </Grid>
        <Grid item>
          <RouterLink
            className={classes.link}
            to="gallery"
            activeClassName={classes.activeLink}
            exact
          >
            <Typography color="inherit">Gallery</Typography>
          </RouterLink>
        </Grid>
        <Grid item>
          <Typography
            className={classes.link}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            About
          </Typography>
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
