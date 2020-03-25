import fractalModels, {
  FractalDefinition,
  ParametersType
} from "../FractalDefinitions";
import {
  ColorDefinition,
  colorPalettes
} from "../FractalDefinitions/common/ColorPalettes";
import {
  fractalTextures,
  FractalTexture
} from "../FractalDefinitions/common/FractalTextures";
import { FractalAction } from "./fractalActions";

function fractalReducer(state: FractalState, action: FractalAction) {
  let newState = { ...state };
  switch (action.type) {
    case "SET_PARAMETER": {
      let newParams = { ...state.parameters };
      newParams[action.payload.name] = action.payload.value;
      newState.parameters = newParams;
      newState.totalElementsCount = calculateTotalElements(
        getFractalDefinition(newState.name),
        newParams
      );
      return newState;
    }
    case "SET_FRACTAL_TYPE": {
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
    }
    case "SET_FRACTAL_TEXTURE": {
      if (action.payload.name !== state.texture.name) {
        newState.texture = action.payload;
      }
      return newState;
    }
    case "RESIZE_STAGE": {
      newState.parameters.width = action.payload.width;
      newState.parameters.height = action.payload.height;
      return newState;
    }
    case "SET_FRACTAL_COLOR": {
      newState.color = action.payload.palette;
      return newState;
    }
    case "SET_TOTAL_ELEMENTS_COUNT": {
      newState.totalElementsCount = action.payload.value;
      return newState;
    }
    case "SET_CURRENT_ELEMENTS_COUNT": {
      newState.currentElementsCount = action.payload.value;
      return newState;
    }
    case "SET_FRACTAL": {
      //type
      newState = initializeFractal(
        getFractalDefinition(action.payload.data.name)
      );
      Object.assign(
        newState.parameters,
        transformParametersProportionally(
          state.parameters,
          state.name,
          action.payload.data.name
        )
      );
      newState.color = state.color;
      newState.texture = state.texture;

      //params
      let newParams = { ...state.parameters };
      Object.entries(action.payload.data.parameters).forEach(param => {
        newParams[param[0]] = param[1];
      });
      newState.parameters = newParams;
      newState.totalElementsCount = calculateTotalElements(
        getFractalDefinition(newState.name),
        newParams
      );

      //texture
      if (action.payload.data.texture.name !== state.texture.name) {
        newState.texture = action.payload.data.texture;
      }
      newState.color = action.payload.data.color;
      return newState;
    }
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
