import * as React from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 250,
      backgroundColor: theme.palette.background.paper
    }
  });

function SimpleList(props: any) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button={true}>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav">
        <ListItem button={true}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem
          button={true}
          component="a"
          href="https://github.com/mcalus3/open-fraksl"
        >
          <ListItemText primary="Go to Github page" />
        </ListItem>
      </List>
    </div>
  );
}

export default withStyles(styles)(SimpleList);
