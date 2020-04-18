import * as PIXI from "pixi.js";
import { depthExceedsZoomLevel } from "./common/sharedRenderingFunctions";
import buildRenderFunction, {
  FractalFunctionDefinitions,
  RenderFunctionParams,
} from "./common/fractalRendererBuilder";

const sierpinskiTreeRenderingFunctionDefinitions: FractalFunctionDefinitions = {
  isLastElement: depthExceedsZoomLevel,
  prepareTransformationAttributes,
  applyPropsToChildren: renderChildren,
};

const sierpinskiTreeFractal = {
  name: "Sierpinski tree",
  parameters: {
    length: {
      name: "size",
      min: 0,
      max: 0.5,
      default: 0.25,
    },
    ratio: {
      name: "shrinking ratio",
      min: 0,
      max: 1,
      default: 0.7,
    },
    angle: {
      name: "angle",
      min: 0,
      max: Math.PI,
      default: Math.PI / 4,
    },
    zoom: {
      name: "depth",
      min: 0,
      max: 18,
      default: 6,
      step: true,
    },
  },
  renderingFunction: buildRenderFunction(
    sierpinskiTreeRenderingFunctionDefinitions
  ),
  branchingFactor: 2,
};

export type SierpinskiTreeFractalParams =
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
    }
  | { [key: string]: number };

function prepareTransformationAttributes(params: RenderFunctionParams) {
  const p = params.treeElement.params;
  const scale = (p.height * p.length) / params.texture.height;
  const textureIsSmallerThan1px =
    params.texture.width * scale < 1 || params.texture.height * scale < 1;

  return {
    anchor: new PIXI.Point(0.5, 1),
    scale: textureIsSmallerThan1px
      ? new PIXI.Point(1 / params.texture.width, scale)
      : new PIXI.Point(scale, scale),
    rotation: p.depth === 1 ? 0 : p.currentAngle,
    x: p.depth === 1 ? p.width / 2 : p.x,
    y: p.depth === 1 ? p.height : p.y,
  };
}

function renderChildren(params: RenderFunctionParams) {
  const pp = params.treeElement.params;
  const p =
    pp.depth === 1
      ? {
          ...pp,
          x: pp.width / 2,
          y: pp.height,
          currentAngle: 0,
        }
      : pp;

  return [
    {
      currentAngle: p.currentAngle - p.angle,
      x: p.x + p.height * p.length * Math.sin(p.currentAngle),
      y: p.y - p.height * p.length * Math.cos(p.currentAngle),
      length: p.length * p.ratio,
      depth: p.depth + 1,
    },
    {
      currentAngle: p.currentAngle + p.angle,
      x: p.x + p.height * p.length * Math.sin(p.currentAngle),
      y: p.y - p.height * p.length * Math.cos(p.currentAngle),
      length: p.length * p.ratio,
      depth: p.depth + 1,
    },
  ];
}

export default sierpinskiTreeFractal;
export { sierpinskiTreeFractal };
