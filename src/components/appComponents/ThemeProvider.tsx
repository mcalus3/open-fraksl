import {
  CssBaseline,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core';
import * as React from 'react';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#e5e5e5',
      main: '#727272',
      dark: '#363839',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff5e50',
      main: '#e41e26',
      dark: '#a90000',
      contrastText: '#fff'
    }
  }
});

function withThemeProvider(Component: React.ComponentType) {
  function WithThemeProvider(props: object) {
    // MuiThemeProvider makes the theme available down the React tree in the react context
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithThemeProvider;
}

export default withThemeProvider;
