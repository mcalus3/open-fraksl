import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// @ts-ignore
import { useDispatch } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import {
  withStyles,
  createStyles,
  Theme,
  WithStyles
} from '@material-ui/core/styles';
import navigationSlice, { ToggleDrawerAction } from './navigationReducer';

const packageJson = require('../../../package.json');
const name = packageJson.name;

const styles = (theme: Theme) =>
  createStyles({
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    }
  });

type Props = {} & WithStyles<typeof styles>;

const NavBar = ({ classes }: Props) => {
  const dispatch = useDispatch();
  const toggle: () => ToggleDrawerAction = () =>
    dispatch(navigationSlice.actions.toggleDrawer());

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={toggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          {name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(NavBar);
