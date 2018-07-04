import * as React from "react";

import { connect } from "react-redux";
import { Stage } from "react-pixi-fiber";
import { State } from "../../stateManagement/model";
import Fractal from "./Fractal";

const OPTIONS = {
  backgroundColor: 0x1099bb
};

type Props = { width: number; height: number };

const FractalStage = (props: Props) => {
  return (
    <Stage options={OPTIONS} width={props.width} height={props.height}>
      <Fractal width={props.width} height={props.height} depth={0} />
    </Stage>
  );
};

const mapStateToProps = (state: State) => ({
  width: state.appState.screenWidth,
  height: state.appState.screenHeight
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FractalStage);
