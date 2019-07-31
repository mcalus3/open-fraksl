import { spiralFractal } from './SpiralFractal';
import { ColorPicker } from './common/ColorPalettes';
import { cantorFractal } from './CantorFractal';
import { sierpinskiTreeFractal } from './SierpinskiTreeFractal';
import { sierpinskiCarpetFractal } from './SierpinskiCarpetFractal';
import { pythagorasTreeFractal } from './PythagorasTreeFractal';

export type FractalElementsTree = {
  sprite: PIXI.Sprite;
  children: FractalElementsTree[];
};

export type ParameterDefinition = {
  name: string;
  min: number;
  max: number;
  default: number;
};

export type ParametersType = { [key: string]: number };

export type FractalDefinition = {
  name: string;
  parameters: Record<string, ParameterDefinition>;
  renderingFunction: (
    pixiApp: PIXI.Application,
    treeElement: FractalElementsTree,
    params: ParametersType,
    texture: PIXI.Texture,
    colorPicker: ColorPicker
  ) => void;
};

const fractalModels: FractalDefinition[] = [
  sierpinskiCarpetFractal,
  cantorFractal,
  sierpinskiTreeFractal,
  pythagorasTreeFractal,
  spiralFractal
];
export default fractalModels;
