import React from "react";
import { makeStyles } from "@material-ui/styles";

import NavBar from "./appNavigation/NavBar";
import FractalGenerator from "./fractalGenerator/FractalGenerator";
import { AuthProvider } from "react-use-auth";
import { Switch, Route, useHistory } from "react-router-dom";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import { AuthCallback } from "./AuthCallback";

const AnyAuthProvider = AuthProvider as any;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#e5e5e5",
      main: "#727272",
      dark: "#363839",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff5e50",
      main: "#e41e26",
      dark: "#a90000",
      contrastText: "#fff"
    }
  }
});

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "column",
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});

const App = () => {
  const classes = useStyles();
  const history = useHistory();

  const FractalMainSite = () => (
    <div className={classes.root}>
      <NavBar />
      <FractalGenerator />
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnyAuthProvider
        navigate={history.push}
        auth0_domain="openfraksl.eu.auth0.com"
        auth0_client_id="m0r3y3DLEumHSZEXe157eP7m7HLsiY1X"
      >
        <Switch>
          <Route path="/auth0_callback" component={AuthCallback} />
          <Route path="/" component={FractalMainSite} />
        </Switch>
      </AnyAuthProvider>
    </ThemeProvider>
  );
};

export default App;
