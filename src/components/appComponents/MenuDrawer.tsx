import * as React from 'react';
import MenuList from './MenuList';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { State } from '../../stateManagement/StateModel';
import { Actions } from '../../stateManagement/appState/appActions';
import { Action } from './StateProvider';
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Dispatch } from 'redux';

const version = require('../../../package.json').version;

const styles = {
  drawer: {
    maxWidth: 250
  }
};

type Props = {
  openDrawer: boolean;
  toggle: () => Action;
} & WithStyles<typeof styles>;

const menuDrawer = (props: Props) => {
  const { classes } = props;

  return (
    <div>
      <SwipeableDrawer
        open={props.openDrawer}
        onClose={props.toggle}
        onOpen={props.toggle}
        classes={{
          paper: classes.drawer
        }}
      >
        <List component="nav">
          <ListItem>
            <ListItemText primary="open-fraksl" secondary={version} />
          </ListItem>
        </List>
        <Divider />

        <MenuList />
      </SwipeableDrawer>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  openDrawer: state.appState.drawerVisible
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  toggle: () => {
    dispatch(Actions.ToggleDrawer());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(menuDrawer));
