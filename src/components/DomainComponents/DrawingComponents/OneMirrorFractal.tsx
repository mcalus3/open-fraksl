import * as React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-pixi-fiber';
import { State } from '../../../stateManagement/StateModel';
import Rectangle from './Rectangle';
import { Mask } from './Mask';
import { drawRect } from '../utils';

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
  const pivot: PIXI.Point = new PIXI.Point(props.width / 2, props.height / 2);
  const maskRect = drawRect(0, 0, props.width, props.height, 0) as any;

  return lastLevelReached(props) ? (
    <Container />
  ) : (
    <Container x={props.x} y={props.y} rotation={props.rot} pivot={pivot}>
      <Mask draw={maskRect}>
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
      </Mask>
    </Container>
  );
};

const mapStateToProps = (state: State, ownProps: extProps) => ({
  x:
    ownProps.width / 2 +
    ownProps.width *
      state.fractalState.parameters['x'] *
      ((ownProps.depth || 0) % 2 === 0 ? 1 : -1),
  y:
    ownProps.height / 2 +
    ownProps.height *
      state.fractalState.parameters['y'] *
      ((ownProps.depth || 0) % 2 === 0 ? 1 : -1),
  width: ownProps.width * state.fractalState.parameters['zoom'],
  height: ownProps.height * state.fractalState.parameters['zoom'],
  depth: ownProps.depth || 0,
  rot: state.fractalState.parameters['rot']
});

const ConnectedFractal = connect(mapStateToProps)(Fractal);

export default ConnectedFractal;

function lastLevelReached(props: Props) {
  return props.depth > 500 || props.width < 3 || props.height < 3;
}
