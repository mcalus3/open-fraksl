import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  root: {
    flexGrow: 1,
  }
};

const NavBar = (props: any) => {
    const { classes } = props;
    return(
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
                open-fraksl
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}

export default withStyles(styles)(NavBar);