import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import MenuDrawer from './MenuDrawer';

const packageJson = require('../../../package.json');
const name = packageJson.name;

const useStyles = makeStyles({
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

function NavBar() {
  const classes = useStyles();
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <AppBar position="static">
      <MenuDrawer
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
      />
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={() => setDrawerVisible(!drawerVisible)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          {name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
