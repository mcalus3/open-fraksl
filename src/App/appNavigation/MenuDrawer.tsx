import * as React from 'react';
import MenuList from './MenuList';
import { withStyles, WithStyles } from '@material-ui/core/styles';
// @ts-ignore
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../StateProvider';
import navigationSlice, { ToggleDrawerAction } from './navigationReducer';
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const packageJson = require('../../../package.json');
const version = packageJson.version;
const name = packageJson.name;

const styles = {
  drawer: {
    maxWidth: 250
  }
};

type Props = WithStyles<typeof styles>;

const MenuDrawer = ({ classes }: Props) => {
  const isDrawerOpened = useSelector(
    (state: State) => state.navigationState.drawerVisible
  );

  const dispatch = useDispatch();
  const toggle: () => ToggleDrawerAction = () =>
    dispatch(navigationSlice.actions.toggleDrawer());

  return (
    <div>
      <SwipeableDrawer
        open={isDrawerOpened}
        onClose={toggle}
        onOpen={toggle}
        classes={{
          paper: classes.drawer
        }}
      >
        <List component="nav">
          <ListItem>
            <ListItemText primary={name} secondary={version} />
          </ListItem>
        </List>
        <Divider />

        <MenuList />
      </SwipeableDrawer>
    </div>
  );
};

export default withStyles(styles)(MenuDrawer);
