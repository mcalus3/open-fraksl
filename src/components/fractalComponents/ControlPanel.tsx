import * as React from "react";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { connect } from "react-redux";
import { State } from "../../stateManagement/model";
import { Paper, Typography } from "@material-ui/core";
import { Actions } from "../../stateManagement/FractalState/fractalActions";
import { Action } from "../../stateManagement/ReduxRoot";

import { Slider } from "@material-ui/lab";

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
  openControlPanel: boolean;
  x: number;
  y: number;
  rot: number;
  zoom: number;
  changeX: (e: any, v: number) => Action;
  changeY: (e: any, v: number) => Action;
  changeRot: (e: any, v: number) => Action;
  changeZoom: (e: any, v: number) => Action;
} & WithStyles<typeof styles>;

const drawer = (props: Props) => {
  const { classes } = props;
  return (
    <Drawer
      anchor={"right"}
      variant={"permanent"}
      open={props.openControlPanel}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <Paper className={classes.paper} elevation={1}>
        <Typography variant="headline" component="h3">
          Control Panel
        </Typography>
        <Typography component="p" id="x">
          x
        </Typography>
        <Slider
          value={props.x}
          aria-labelledby="x"
          onChange={props.changeX}
          max={100}
          min={-100}
        />
        <Typography component="p" id="y">
          y
        </Typography>
        <Slider
          value={props.x}
          aria-labelledby="y"
          onChange={props.changeY}
          max={100}
          min={-100}
        />
        <Typography component="p" id="rot">
          rotation
        </Typography>
        <Slider
          value={props.rot}
          aria-labelledby="rot"
          onChange={props.changeRot}
          max={Math.PI * 2}
          min={0}
        />
        <Typography component="p" id="zoom">
          zoom
        </Typography>
        <Slider
          value={props.zoom}
          aria-labelledby="zoom"
          onChange={props.changeZoom}
          max={0.99}
          min={0}
        />
      </Paper>
    </Drawer>
  );
};

const mapStateToProps = (state: State) => ({
  openControlPanel: state.appState.controlPanelVisible,
  x: state.fractalState.x,
  y: state.fractalState.y,
  rot: state.fractalState.rot,
  zoom: state.fractalState.zoom
});

const mapDispatchToProps = (dispatch: any) => ({
  changeX: (e: any, v: number) => {
    dispatch(Actions.setX(v));
  },
  changeY: (e: any, v: number) => {
    dispatch(Actions.setY(v));
  },
  changeRot: (e: any, v: number) => {
    dispatch(Actions.setRot(v));
  },
  changeZoom: (e: any, v: number) => {
    dispatch(Actions.setZ(v));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(drawer));
