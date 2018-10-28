import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../stateManagement/StateModel';

type NOT_INITIALISED = 'not_initialised';

type FractalElementsTree = {
  element: PIXI.Sprite | NOT_INITIALISED;
  children: FractalElementsTree[];
};

type PyramidFractalParams = {
  depth: number;
  w: number;
  h: number;
  r: number;
  z: number;
  dx: number;
  dy: number;
};

type Props = {
  pixiApp: PIXI.Application;
  params: { [key: string]: number };
};

class Fractal extends React.Component<Props> {
  private rootFractalElement: FractalElementsTree = {
    element: 'not_initialised',
    children: []
  };

  public render() {
    return null;
  }

  public componentDidUpdate() {
    const params: PyramidFractalParams = {
      depth: 1,
      w: this.props.params['width'],
      h: this.props.params['height'],
      r: this.props.params['rot'],
      z: this.props.params['zoom'] / (this.props.params['zoom'] + 1),
      dx: this.props.params['x'] * this.props.params['width'],
      dy: this.props.params['y'] * this.props.params['height']
    };

    this.renderFractalIterative(this.rootFractalElement, params);
  }

  private renderFractalIterative = (
    treeElement: FractalElementsTree,
    params: PyramidFractalParams
  ) => {
    if (!this.CheckEndCondition(params)) {
      this.InitializeSprite(treeElement);

      this.applyTransformation(treeElement.element as PIXI.Sprite, params);

      this.renderChildren(treeElement.children, params);
    }
  };

  private CheckEndCondition = (params: PyramidFractalParams): boolean => {
    return Math.min(params.h, params.w) < 3 || params.depth > 500;
  };

  private InitializeSprite = (treeElement: FractalElementsTree) => {
    if (treeElement.element === 'not_initialised') {
      treeElement.element = new PIXI.Sprite(PIXI.Texture.WHITE);
      this.props.pixiApp.stage.addChild(treeElement.element);
    }
  };

  private applyTransformation = (
    sprite: PIXI.Sprite,
    params: PyramidFractalParams
  ) => {
    sprite.tint = 0xffffff / params.depth;

    sprite.anchor.set(0.5);
    sprite.x = this.props.params.width / 2 + params.dx * params.depth;
    sprite.y = this.props.params.height / 2 + params.dy * params.depth;

    sprite.rotation = params.r * params.depth;
    sprite.scale = new PIXI.Point(
      (params.w * Math.pow(params.z, params.depth)) / 10,
      (params.h * Math.pow(params.z, params.depth)) / 10
    );
  };

  private renderChildren = (
    elements: FractalElementsTree[],
    params: PyramidFractalParams
  ) => {
    const newDepth = params.depth + 1;

    const newParams = {
      depth: newDepth,
      w: params.w * params.z,
      h: params.h * params.z,
      r: params.r,
      z: params.z,
      dx: params.dx,
      dy: params.dy
    };

    if (elements.length === 0) {
      elements[0] = { element: 'not_initialised', children: [] };
    }

    this.renderFractalIterative(elements[0], newParams);
  };
}

const mapStateToProps = (
  state: State,
  ownProps: { pixiApp: PIXI.Application }
) => ({
  pixiApp: ownProps.pixiApp,
  params: state.fractalState.parameters
});

export default connect(mapStateToProps)(Fractal);
