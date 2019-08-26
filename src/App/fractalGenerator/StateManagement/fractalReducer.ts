import fractalModels, {
  FractalDefinition,
  ParametersType
} from '../FractalDefinitions';
import {
  ColorDefinition,
  colorPalettes
} from '../FractalDefinitions/common/ColorPalettes';
import {
  fractalTextures,
  FractalTexture
} from '../FractalDefinitions/common/FractalTextures';
import {
  FractalAction,
  SetParameter,
  SetFractal,
  SetFractalTexture,
  ResizeStage,
  SetFractalColor,
  SetCurrentElementsCount,
  SetTotalElementsCount
} from './fractalActions';

function fractalReducer(state: FractalState, action: FractalAction) {
  let newState = { ...state };
  switch (action.type) {
    case SetParameter:
      let newParams = { ...state.parameters };
      newParams[action.payload.name] = action.payload.value;
      newState.parameters = newParams;
      newState.totalElementsCount = calculateTotalElements(
        getFractalDefinition(newState.name),
        newParams
      );
      return newState;

    case SetFractal:
      newState = initializeFractal(getFractalDefinition(action.payload.name));
      Object.assign(
        newState.parameters,
        transformParametersProportionally(
          state.parameters,
          state.name,
          action.payload.name
        )
      );
      newState.color = state.color;
      newState.texture = state.texture;
      return newState;

    case SetFractalTexture:
      if (action.payload.name !== state.texture.name) {
        newState.texture = action.payload;
      }
      return newState;

    case ResizeStage:
      newState.parameters.width = action.payload.width;
      newState.parameters.height = action.payload.height;
      return newState;
    case SetFractalColor:
      newState.color = action.payload.palette;
      return newState;
    case SetTotalElementsCount:
      newState.totalElementsCount = action.payload.value;
      return newState;
    case SetCurrentElementsCount:
      newState.currentElementsCount = action.payload.value;
      return newState;
  }
}

export type FractalState = {
  name: string;
  parameters: ParametersType;
  texture: FractalTexture;
  color: ColorDefinition;
  totalElementsCount: number;
  currentElementsCount: number;
};

const fractalInitialState = initializeFractal(fractalModels[0]);

function initializeFractal(fractalDef: FractalDefinition): FractalState {
  const parameterObject: { [key: string]: number } = Object.keys(
    fractalDef.parameters
  ).reduce(
    (o, key) => ({ ...o, [key]: fractalDef.parameters[key].default }),
    {}
  );
  return {
    name: fractalDef.name,
    parameters: parameterObject as ParametersType,
    texture: fractalTextures[0],
    color: colorPalettes[0],
    totalElementsCount: calculateTotalElements(fractalDef, parameterObject),
    currentElementsCount: 0
  };
}

function calculateTotalElements(
  fractalDef: FractalDefinition,
  parameterObject: { [key: string]: number }
): number {
  let sum = 0;
  for (let x = 0; x < parameterObject.zoom; x++) {
    sum += Math.floor(Math.pow(fractalDef.branchingFactor, x));
  }
  return sum;
}

function getFractalDefinition(name: string) {
  return fractalModels.find(e => e.name === name) || fractalModels[0];
}

function transformParametersProportionally(
  parameters: ParametersType,
  oldName: string,
  newName: string
) {
  const oldParamDefinitions = getFractalDefinition(oldName);
  const newParamDefinitions = getFractalDefinition(newName);
  const newParams = { ...parameters };
  Object.keys(oldParamDefinitions.parameters).forEach(k => {
    if (newParamDefinitions.parameters[k]) {
      const min = oldParamDefinitions.parameters[k].min;
      const max = oldParamDefinitions.parameters[k].max;
      const value = parameters[k];
      const proportion = (value - min) / (max - min);

      const newMin = newParamDefinitions.parameters[k].min;
      const newMax = newParamDefinitions.parameters[k].max;
      newParams[k] = proportion * (newMax - newMin) + newMin;
    }
  });
  return newParams;
}

export default fractalReducer;
export {
  initializeFractal,
  fractalInitialState,
  getFractalDefinition,
  transformParametersProportionally
};
