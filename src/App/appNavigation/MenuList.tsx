import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

function MenuList() {
  return (
    <List component="nav">
      <ListItem button={true}>
        <ListItemText primary="Settings" />
      </ListItem>
      <ListItem button={true}>
        <ListItemText primary="About" />
      </ListItem>
      <ListItem
        button={true}
        component="a"
        href="https://github.com/mcalus3/rtrm-starter"
      >
        <ListItemText primary="Go to Github page" />
      </ListItem>
    </List>
  );
}

export default MenuList;
