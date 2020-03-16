import React from "react";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import { AuthProvider } from "react-use-auth";
import { useHistory } from "react-router-dom";
import FractalStateProvider from "./fractalGenerator/StateManagement/FractalContextProvider";
const AnyAuthProvider = AuthProvider as any;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#727272"
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
        <FractalStateProvider>
          {props.children}
        </FractalStateProvider>
      </AnyAuthProvider>
    </ThemeProvider>
  );
};
