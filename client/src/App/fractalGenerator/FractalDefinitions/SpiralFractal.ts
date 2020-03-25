import * as PIXI from "pixi.js";
import buildRenderFunction, {
  RenderFunctionParams,
  FractalFunctionDefinitions
} from "./common/fractalRendererBuilder";

const spiralRenderingFunctionDefinitions: FractalFunctionDefinitions = {
  isLastElement: isSmallerThan1px,
  prepareTransformationAttributes,
  applyPropsToChildren: renderChildren
};

export type SpiralFractalParams =
  | {
      x: number;
      y: number;
      rotation: number;
      zoom: number;
      width: number;
      height: number;
      depth: number;
    }
  | { [key: string]: number };

const spiralFractal = {
  name: "spiral fractal",
  parameters: {
    x: {
      name: "x",
      min: -1,
      max: 1,
      default: 0
    },
    y: {
      name: "y",
      min: -1,
      max: 1,
      default: 0
    },
    rotation: {
      name: "rotation",
      min: 0,
      max: Math.PI,
      default: 0.1
    },
    zoom: {
      name: "depth",
      min: 0,
      max: 200,
      default: 30
    }
  },
  renderingFunction: buildRenderFunction(spiralRenderingFunctionDefinitions),
  branchingFactor: 0
};

function isSmallerThan1px(params: RenderFunctionParams) {
  return (
    CalculateZoomForElement(params.treeElement.params) *
      params.treeElement.params.width <
      1 || params.treeElement.params.depth > 5000
  );
}

function CalculateZoomForElement(params: SpiralFractalParams) {
  return Math.pow(params.zoom / (params.zoom + 1), params.depth);
}

function prepareTransformationAttributes(params: RenderFunctionParams) {
  const p = params.treeElement.params;
  const zoom = CalculateZoomForElement(p);
  const scale = new PIXI.Point(
    (p.width * zoom) / params.texture.width,
    (p.height * zoom) / params.texture.height
  );

  return {
    anchor: new PIXI.Point(0.5, 0.5),
    scale,
    rotation: p.rotation * p.depth,
    x: p.width / 2 + p.x * p.depth,
    y: p.height / 2 + p.y * p.depth
  };
}

function renderChildren(params: RenderFunctionParams) {
  return [
    {
      depth: params.treeElement.params.depth + 1
    }
  ];
}

export { spiralFractal };
