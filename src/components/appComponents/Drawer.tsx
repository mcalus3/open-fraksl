import * as React from "react";
import MenuList from "./MenuList";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { connect } from "react-redux";
import { State } from "../../stateManagement/model";

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: drawerWidth
    },
    toolbar: theme.mixins.toolbar
  });

type Props = { openDrawer: boolean } & WithStyles<typeof styles>;

const drawer = (props: Props) => {
  const { classes } = props;
  return (
    <Drawer
      variant={"persistent"}
      open={props.openDrawer}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <div tabIndex={0} role="button">
        <MenuList />
      </div>
    </Drawer>
  );
};

const mapStateToProps = (state: State) => ({
  openDrawer: state.appState.drawerVisible
});

export default connect(mapStateToProps)(withStyles(styles)(drawer));
