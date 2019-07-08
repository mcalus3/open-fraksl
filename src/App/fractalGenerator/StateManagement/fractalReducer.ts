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
  SetFractalColor
} from './fractalActions';

function fractalReducer(state: FractalState, action: FractalAction) {
  let newState = { ...state };
  switch (action.type) {
    case SetParameter:
      let newParams = { ...state.parameters };
      newParams[action.payload.name] = action.payload.value;
      newState.parameters = newParams;
      return newState;

    case SetFractal:
      newState = initializeFractal(getFractalDefinition(action.payload.name));
      Object.assign(newState.parameters, state.parameters);
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
      newState.color =
        colorPalettes.find(palette => palette.name === action.payload.name) ||
        colorPalettes[0];
      return newState;
  }
}

export type FractalState = {
  name: string;
  parameters: ParametersType;
  texture: FractalTexture;
  color: ColorDefinition;
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
    color: colorPalettes[0]
  };
}

function getFractalDefinition(name: string) {
  return fractalModels.find(e => e.name === name) || fractalModels[0];
}

export default fractalReducer;
export { initializeFractal, fractalInitialState, getFractalDefinition };
