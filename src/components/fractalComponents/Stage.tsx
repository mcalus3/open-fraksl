import * as React from "react";

import {
  withStyles,
  createStyles,
  Theme,
  WithStyles
} from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Stage } from "react-pixi-fiber";
import { State } from "../../stateManagement/model";

const OPTIONS = {
  backgroundColor: 0x1099bb
};

const styles = (theme: Theme) =>
  createStyles({
    content: {}
  });
type Props = { width: number; height: number } & WithStyles<typeof styles>;

const FractalStage = (props: Props) => {
  // const { classes } = props;
  return <Stage options={OPTIONS} width={props.width} height={props.height} />;
};

const mapStateToProps = (state: State) => ({
  width: state.appState.screenWidth,
  height: state.appState.screenHeight
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FractalStage));
