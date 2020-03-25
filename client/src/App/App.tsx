import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { AuthCallback } from "./AuthCallback";
import { Providers } from "./Providers";
import { AppBar } from "./appNavigation";
import { FractalGenerator } from "./fractalGenerator";
import { Gallery } from "./FractalGallery";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "column",
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});

export const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <Providers>
        <div className={classes.root}>
          <AppBar />
          <Switch>
            <Route path="/auth0_callback" component={AuthCallback} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/" component={FractalGenerator} />
          </Switch>
        </div>
      </Providers>
    </Router>
  );
};
