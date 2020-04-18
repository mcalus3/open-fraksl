import React from "react";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import cyan from "@material-ui/core/colors/cyan";
import { AuthProvider } from "react-use-auth";
import { useHistory } from "react-router-dom";
import { FractalStateProvider } from "./fractalGenerator";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
const apiConfig = require(`../apiconfig.${process.env.NODE_ENV}.json`);

const AnyAuthProvider = AuthProvider as any;

const client = new ApolloClient({
  uri: apiConfig.apiUrl,
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[600],
      light: "#a4a4a4",
      dark: "#494949",
      contrastText: "#fff",
    },
    secondary: {
      main: cyan[600],
      light: "#5ddef4",
      dark: "#007c91",
      contrastText: "#000",
    },
  },
});

export const Providers: React.FC = (props) => {
  const history = useHistory();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AnyAuthProvider
          navigate={history.push}
          auth0_domain={apiConfig.auth0_domain}
          auth0_client_id={apiConfig.auth0_client_id}
        >
          <FractalStateProvider>{props.children}</FractalStateProvider>
        </AnyAuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};
