import * as PIXI from "pixi.js";

import { depthExceedsZoomLevel } from "./common/sharedRenderingFunctions";
import buildRenderFunction, {
  RenderFunctionParams,
  FractalFunctionDefinitions
} from "./common/fractalRendererBuilder";

const pythagorasTreeRenderingFunctionDefinitions: FractalFunctionDefinitions = {
  isLastElement: depthExceedsZoomLevel,
  prepareTransformationAttributes,
  applyPropsToChildren: renderChildren
};

export type PythagorasTreeFractalParams =
  | {
      length: number;
      ratio: number;
      angle: number;
      currentAngle: number;
      zoom: number;
      width: number;
      height: number;
      depth: number;
      x: number;
      y: number;
      anchor: number;
    }
  | { [key: string]: number };

const pythagorasTreeFractal = {
  name: "Pythagoras tree",
  parameters: {
    length: {
      name: "size",
      min: 0,
      max: 1,
      default: 0.25
    },
    angle: {
      name: "angle",
      min: 0,
      max: Math.PI / 2,
      default: Math.PI / 4
    },
    zoom: {
      name: "depth",
      min: 0,
      max: 18,
      default: 5,
      step: true
    }
  },
  renderingFunction: buildRenderFunction(
    pythagorasTreeRenderingFunctionDefinitions
  ),
  branchingFactor: 2
};

function calculateNewCoords(
  params: PythagorasTreeFractalParams,
  width: number
) {
  if (params.anchor === 0) {
    const x1 =
      params.x + params.height * params.length * Math.sin(params.currentAngle);
    const y1 =
      params.y - params.height * params.length * Math.cos(params.currentAngle);
    const x2 =
      params.x +
      width * Math.cos(params.currentAngle) +
      params.height * params.length * Math.sin(params.currentAngle);
    const y2 =
      params.y +
      width * Math.sin(params.currentAngle) +
      -params.height * params.length * Math.cos(params.currentAngle);
    return { x1, y1, x2, y2 };
  } else {
    const x1 =
      params.x -
      width * Math.cos(params.currentAngle) +
      params.height * params.length * Math.sin(params.currentAngle);
    const y1 =
      params.y -
      width * Math.sin(params.currentAngle) -
      params.height * params.length * Math.cos(params.currentAngle);
    const x2 =
      params.x + params.height * params.length * Math.sin(params.currentAngle);
    const y2 =
      params.y - params.height * params.length * Math.cos(params.currentAngle);
    return { x1, y1, x2, y2 };
  }
}

function prepareTransformationAttributes(params: RenderFunctionParams) {
  const p = params.treeElement.params;
  const scale = (p.height * p.length) / params.texture.height;
  const textureIsSmallerThan1px =
    params.texture.width * scale < 1 || params.texture.height * scale < 1;

  return {
    anchor: new PIXI.Point(p.anchor, 1),
    scale: textureIsSmallerThan1px
      ? new PIXI.Point(1 / params.texture.width, scale)
      : new PIXI.Point(scale, scale),
    rotation: p.depth === 1 ? 0 : p.currentAngle,
    x: p.depth === 1 ? p.width / 2 - (p.height * p.length) / 2 : p.x,
    y: p.depth === 1 ? p.height : p.y
  };
}

function renderChildren(params: RenderFunctionParams) {
  const pp = params.treeElement.params;
  const p =
    pp.depth === 1
      ? {
          ...pp,
          x: pp.width / 2 - (pp.height * pp.length) / 2,
          y: pp.height,
          currentAngle: 0,
          anchor: 0
        }
      : pp;

  const { x1, y1, x2, y2 } = calculateNewCoords(
    p,
    params.treeElement.sprite.width
  );

  return [
    {
      currentAngle: p.currentAngle - p.angle,
      x: x1,
      y: y1,
      length: p.length * Math.cos(p.angle),
      depth: p.depth + 1,
      anchor: 0
    },
    {
      currentAngle: p.currentAngle + Math.PI / 2 - p.angle,
      x: x2,
      y: y2,
      length: p.length * Math.sin(p.angle),
      depth: p.depth + 1,
      anchor: 1
    }
  ];
}

export default pythagorasTreeFractal;
export { pythagorasTreeFractal };
