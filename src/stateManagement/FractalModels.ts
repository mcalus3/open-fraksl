export type ParameterDefinition = {
  name: string;
  min: number;
  max: number;
  default: number;
};

export type FractalDefinition = {
  name: string;
  parameters: { [key: string]: ParameterDefinition };
};

export const pyramidFractal: FractalDefinition = {
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
      max: 2 * Math.PI,
      default: 0.1
    },
    zoom: {
      name: 'zoom',
      min: 0,
      max: 100,
      default: 50
    }
  }
};

export const oneMirrorFractal: FractalDefinition = {
  name: 'one mirror fractal',
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
      max: 2 * Math.PI,
      default: 0.1
    },
    zoom: {
      name: 'zoom',
      min: 0,
      max: 0.99,
      default: 0.8
    }
  }
};

export const fractalModels = [pyramidFractal, oneMirrorFractal];
