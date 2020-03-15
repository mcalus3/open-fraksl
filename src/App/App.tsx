import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import AppBar from "./appNavigation/AppBar";
import FractalGenerator from "./fractalGenerator/FractalGenerator";
import { AuthCallback } from "./AuthCallback";
import { Providers } from "./Providers";

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
            <Route path="/" component={FractalGenerator} />
            <Route path="/gallery" component={FractalGenerator} />
          </Switch>
        </div>
      </Providers>
    </Router>
  );
};
