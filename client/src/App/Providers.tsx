import React from "react";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import cyan from "@material-ui/core/colors/cyan";
import { AuthProvider } from "react-use-auth";
import { useHistory } from "react-router-dom";
import { FractalStateProvider } from "./fractalGenerator";
const AnyAuthProvider = AuthProvider as any;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[600],
      light: "#a4a4a4",
      dark: "#494949",
      contrastText: "#fff"
    },
    secondary: {
      main: cyan[600],
      light: "#5ddef4",
      dark: "#007c91",
      contrastText: "#000"
    }
  }
});

export const Providers: React.FC = props => {
  const history = useHistory();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnyAuthProvider
        navigate={history.push}
        auth0_domain="openfraksl.eu.auth0.com"
        auth0_client_id="m0r3y3DLEumHSZEXe157eP7m7HLsiY1X"
      >
        <FractalStateProvider>{props.children}</FractalStateProvider>
      </AnyAuthProvider>
    </ThemeProvider>
  );
};
