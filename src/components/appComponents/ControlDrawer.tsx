import * as React from "react";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import { connect } from "react-redux";
import { State } from "../../stateManagement/StateModel";
import ControlPanel from "./ControlPanel";
import FractalSelection from "./FractalSelection";
import { Paper } from "@material-ui/core";

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      flexFlow: "column",
      flexGrow: 0,
      width: drawerWidth,
      anchor: "right",
      position: "relative",
      float: "right",
      height: "100%"
    }
  });

type Props = {
  openControlDrawer: boolean;
} & WithStyles<typeof styles>;

const ControlDrawer = (props: Props) => {
  const { classes } = props;

  return (
    <Paper
      classes={{
        root: classes.paper
      }}
    >
      <ControlPanel />
      <FractalSelection />
    </Paper>
  );
};

const mapStateToProps = (state: State) => ({
  openControlDrawer: state.appState.controlPanelVisible
});

export default connect(mapStateToProps)(withStyles(styles)(ControlDrawer));
