import { PyramidFractal } from './PyramidFractal';
import { spiralFractal } from './SpiralFractal';
import { ColorPicker } from './common/ColorPalettes';
import { branchingFractal } from './BranchingFractal';

export type FractalElementsTree = {
  sprite: PIXI.Sprite;
  children: FractalElementsTree[];
};

export type Params = { [key: string]: number };

export type ParameterDefinition = {
  name: string;
  min: number;
  max: number;
  default: number;
};

export type FractalDefinition = {
  name: string;
  parameters: { [key: string]: ParameterDefinition };
  renderingFunction: (
    pixiApp: PIXI.Application,
    treeElement: FractalElementsTree,
    params: any, // { [key: string]: number }
    texture: PIXI.Texture,
    colorPicker: ColorPicker
  ) => void;
};

const fractalModels = [branchingFractal, spiralFractal, PyramidFractal];
export default fractalModels;
