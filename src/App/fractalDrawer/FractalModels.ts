import renderPyramidFractal from './DrawingComponents/PyramidFractalRenderer';
import renderSpiralFractal from './DrawingComponents/SpiralFractalRenderer';
import { ColorPicker } from './ColorPalettes';

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

export const spiralFractal: FractalDefinition = {
  name: 'spiral fractal',
  parameters: {
    x: {
      name: 'x',
      min: -1,
      max: 1,
      default: 0
    },
    y: {
      name: 'y',
      min: -1,
      max: 1,
      default: 0
    },
    rot: {
      name: 'rot',
      min: 0,
      max: Math.PI,
      default: 0.1
    },
    zoom: {
      name: 'zoom',
      min: 0,
      max: 100,
      default: 50
    }
  },
  renderingFunction: renderSpiralFractal
};

export const PyramidFractal: FractalDefinition = {
  name: 'pyramid fractal',
  parameters: {
    x: {
      name: 'x',
      min: -1,
      max: 1,
      default: 0
    },
    y: {
      name: 'y',
      min: -1,
      max: 1,
      default: 0
    },
    rot: {
      name: 'rot',
      min: 0,
      max: Math.PI,
      default: 0.2
    },
    zoom: {
      name: 'zoom',
      min: 0,
      max: 100,
      default: 70
    }
  },
  renderingFunction: renderPyramidFractal
};

export const fractalModels = [spiralFractal, PyramidFractal];
