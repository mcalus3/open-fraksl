import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import * as React from "react";
import MenuList from "./MenuList";
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const styles = (theme: any) => ({
  root: {
    position: "relative" as "relative",
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
});

const SwipeableTemporaryDrawer = (props: any) => {
  const { classes } = props;
  return (
    <SwipeableDrawer
      open={true}
      onClose={toggleDrawer("left", false)}
      onOpen={toggleDrawer("left", true)}
      classes={{
        paper: classes.root
      }}
    >
      <div className={classes.toolbar} />
      <div
        tabIndex={0}
        role="button"
        onClick={toggleDrawer("left", false)}
        onKeyDown={toggleDrawer("left", false)}
      >
        <MenuList />
      </div>
    </SwipeableDrawer>
  );
};

const toggleDrawer = (side: any, open: any) => () => {
  console.log(side, open);
};

export default withStyles(styles)(SwipeableTemporaryDrawer);
