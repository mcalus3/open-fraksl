import { ColorPicker } from './common/ColorPalettes';
import { cantorFractal } from './CantorFractal';
import { sierpinskiTreeFractal } from './SierpinskiTreeFractal';
import { pythagorasTreeFractal } from './PythagorasTreeFractal';
import { spiralFractal } from './SpiralFractal';
import { sierpinskiCarpetFractal } from './SierpinskiCarpetFractal';

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
  branchingFactor: number;
};

const fractalModels: FractalDefinition[] = [
  sierpinskiCarpetFractal,
  sierpinskiTreeFractal,
  cantorFractal,
  pythagorasTreeFractal,
  spiralFractal
];
export default fractalModels;
