import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import About from './About';

function MenuList() {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <List component="nav">
        <ListItem
          button={true}
          component="a"
          href="https://github.com/mcalus3/open-fraksl"
        >
          <ListItemText primary="Go to Github page" />
        </ListItem>
        <ListItem
          button={true}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <ListItemText primary="About" />
        </ListItem>
      </List>
      <About
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
}

export default MenuList;
