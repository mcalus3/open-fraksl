import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../stateManagement/StateModel';
import { getFractalDefinition } from '../../../stateManagement/utils';

type Props = {
  width: number;
  height: number;
  fractal: string;
};

const Fractal: React.SFC<Props> = (props: Props) => {
  const FractalRenderer = getFractalDefinition(props.fractal).renderer;
  return <FractalRenderer width={props.width} height={props.height} />;
};

const mapStateToProps = (state: State) => ({
  width: state.appState.screenWidth,
  height: state.appState.screenHeight,
  fractal: state.fractalState.name
});

const ConnectedFractal = connect(mapStateToProps)(Fractal);

export default ConnectedFractal;
