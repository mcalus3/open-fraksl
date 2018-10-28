import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import {
  withStyles,
  createStyles,
  Theme,
  WithStyles
} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Action } from './StateProvider';
import { Actions } from '../../stateManagement/appState/appActions';
import { State } from '../../stateManagement/StateModel';
import { Dispatch } from 'redux';

const styles = (theme: Theme) =>
  createStyles({
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    }
  });
type Props = { onToggleDrawer: () => Action } & WithStyles<typeof styles>;

const NavBar = (props: Props) => {
  const { classes } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={props.onToggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit">
          open-fraksl
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onToggleDrawer: () => {
    dispatch(Actions.ToggleDrawer());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NavBar));
