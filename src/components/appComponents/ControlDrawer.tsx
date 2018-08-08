import * as React from "react";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { connect } from "react-redux";
import { State } from "../../stateManagement/StateModel";
import ControlPanel from "./ControlPanel";
import FractalSelection from "./FractalSelection";

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    paper: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    }
  });

type Props = {
  openControlDrawer: boolean;
} & WithStyles<typeof styles>;

const ControlDrawer = (props: Props) => {
  const { classes } = props;

  return (
    <Drawer
      anchor={"right"}
      variant={"permanent"}
      open={props.openControlDrawer}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <ControlPanel />
      <FractalSelection />
    </Drawer>
  );
};

const mapStateToProps = (state: State) => ({
  openControlDrawer: state.appState.controlPanelVisible
});

export default connect(mapStateToProps)(withStyles(styles)(ControlDrawer));
