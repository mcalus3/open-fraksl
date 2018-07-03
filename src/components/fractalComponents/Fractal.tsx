import * as React from "react";
import { connect } from "react-redux";
import { Container } from "react-pixi-fiber";
import { State } from "../../stateManagement/model";
import Rectangle from "./Rectangle";

type Props = { width: number; height: number };

const Fractal: any = (props: Props) => {
  return (
    <Container x={300} y={300} rotation={0.5}>
      <Rectangle fill={0} x={100} y={100} width={300} height={300} />
      {/* <Fractal /> */}
    </Container>
  );
};

const mapStateToProps = (state: State) => ({
  width: state.appState.screenWidth,
  height: state.appState.screenHeight
});

export default connect(mapStateToProps)(Fractal);
