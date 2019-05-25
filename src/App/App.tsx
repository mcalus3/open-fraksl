import React from 'react';
import { makeStyles } from '@material-ui/styles';

import NavBar from './appNavigation/NavBar';
import ContentContainer from './fractalDrawer/FractalDrawer';
import withThemeProvider from './ThemeProvider';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'column',
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
      <ContentContainer />
    </div>
  );
};

export default withThemeProvider(App);
