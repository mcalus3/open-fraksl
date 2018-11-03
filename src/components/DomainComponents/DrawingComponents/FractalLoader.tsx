import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../stateManagement/StateModel';
import { FractalElementsTree } from 'src/stateManagement/FractalModels';
import { getFractalDefinition } from 'src/stateManagement/utils';

type Props = {
  pixiApp: PIXI.Application;
  params: { [key: string]: number };
  fractal: string;
};

class FractalLoader extends React.Component<Props> {
  private rootFractalElement: FractalElementsTree = {
    element: new PIXI.Sprite(PIXI.Texture.WHITE),
    children: []
  };

  public render() {
    return null;
  }

  public componentDidUpdate() {
    getFractalDefinition(this.props.fractal).renderingFunction(
      this.props.pixiApp,
      this.rootFractalElement,
      {
        ...this.props.params,
        depth: 1,
        zoom: this.props.params.zoom / (this.props.params.zoom + 1),
        width: Math.floor(this.props.pixiApp.screen.width),
        height: Math.floor(this.props.pixiApp.screen.height)
      }
    );
  }
}

const mapStateToProps = (
  state: State,
  ownProps: { pixiApp: PIXI.Application }
) => ({
  pixiApp: ownProps.pixiApp,
  params: state.fractalState.parameters,
  fractal: state.fractalState.name,
  width: state.fractalState.parameters.width,
  height: state.fractalState.parameters.height
});

export default connect(mapStateToProps)(FractalLoader);
