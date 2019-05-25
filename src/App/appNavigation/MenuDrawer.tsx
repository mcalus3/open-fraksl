import React from 'react';
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core';

import MenuList from './MenuList';

const packageJson = require('../../../package.json');
const version = packageJson.version;
const name = packageJson.name;

type Props = {
  drawerVisible: boolean;
  setDrawerVisible: (value: boolean) => void;
};

function MenuDrawer({ drawerVisible, setDrawerVisible }: Props) {
  return (
    <div>
      <SwipeableDrawer
        open={drawerVisible}
        onClose={() => setDrawerVisible(!drawerVisible)}
        onOpen={() => setDrawerVisible(!drawerVisible)}
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
}

export default MenuDrawer;
