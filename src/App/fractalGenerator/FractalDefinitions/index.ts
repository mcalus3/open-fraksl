import { ColorPicker } from './common/ColorPalettes';
import { branchingFractal } from './BranchingFractal';
import { cantorFractal } from './CantorFractal';
import { sierpinskiTreeFractal } from './SierpinskiTreeFractal';
import { pythagorasTreeFractal } from './PythagorasTreeFractal';
import { spiralFractal } from './SpiralFractal';

export type FractalElementsTree = {
  sprite: PIXI.Sprite;
  children: FractalElementsTree[];
  params: ParametersType;
};

export type ParameterDefinition = {
  name: string;
  min: number;
  max: number;
  default: number;
  step?: boolean;
};

export type ParametersType = { [key: string]: number };

export type FractalDefinition = {
  name: string;
  parameters: Record<string, ParameterDefinition>;
  renderingFunction: (
    pixiApp: PIXI.Application,
    treeElement: FractalElementsTree,
    texture: PIXI.Texture,
    colorPicker: ColorPicker
  ) => void;
};

const fractalModels: FractalDefinition[] = [
  // branchingFractal,
  //   sierpinskiCarpetFractal,
  sierpinskiTreeFractal,
  cantorFractal,
  pythagorasTreeFractal,
  spiralFractal
];
export default fractalModels;
