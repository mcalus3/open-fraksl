import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../stateManagement/StateModel';
import { applyContextAndRenderFractal } from './PyramidFractalRenderer';

type Props = {
  pixiApp: PIXI.Application;
  params: { [key: string]: number };
};

class FractalLoader extends React.Component<Props> {
  public render() {
    return null;
  }

  public componentDidUpdate() {
    applyContextAndRenderFractal(this.props.pixiApp, this.props.params);
  }
}

const mapStateToProps = (
  state: State,
  ownProps: { pixiApp: PIXI.Application }
) => ({
  pixiApp: ownProps.pixiApp,
  params: state.fractalState.parameters
});

export default connect(mapStateToProps)(FractalLoader);
