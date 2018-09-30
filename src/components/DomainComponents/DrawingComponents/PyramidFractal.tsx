import * as React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-pixi-fiber';
import { State } from '../../../stateManagement/StateModel';
import Rectangle from './Rectangle';

type extProps = {
  width: number;
  height: number;
  depth?: number;
};

type Props = {
  x: number;
  y: number;
  rot: number;
  width: number;
  height: number;
  depth: number;
};

const Fractal: React.SFC<Props> = (props: Props) => {
  const pivot = new PIXI.Point(props.width / 2, props.height / 2);

  return lastLevelReached(props) ? (
    <Container />
  ) : (
    <Container x={props.x} y={props.y} rotation={props.rot} pivot={pivot}>
      <Rectangle
        fill={Math.floor((1 / props.depth) * 0xffffff)}
        x={0}
        y={0}
        width={props.width}
        height={props.height}
      />
      <ConnectedFractal
        width={props.width}
        height={props.height}
        depth={props.depth + 1}
      />
    </Container>
  );
};

const mapStateToProps = (state: State, ownProps: extProps) => ({
  x: (ownProps.width / 2) * (1 + state.fractalState.parameters['x']),
  y: (ownProps.height / 2) * (1 + state.fractalState.parameters['y']),
  width: ownProps.width * state.fractalState.parameters['zoom'],
  height: ownProps.height * state.fractalState.parameters['zoom'],
  depth: ownProps.depth ? ownProps.depth : 0,
  rot: state.fractalState.parameters['rot']
});

const ConnectedFractal = connect(mapStateToProps)(Fractal);

export default ConnectedFractal;

function lastLevelReached(props: Props) {
  return props.depth > 500 || props.width < 3 || props.height < 3;
}
