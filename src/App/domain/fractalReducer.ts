import { createSlice } from 'redux-starter-kit';
import {
  pyramidFractal,
  FractalDefinition,
  fractalModels
} from './FractalModels';

export const fractalState = initializeFractal(pyramidFractal);
export type FractalState = {
  name: string;
  parameters: { [key: string]: number };
};

const fractalSlice = createSlice({
  initialState: fractalState,
  reducers: {
    setParameter: (state: FractalState, action: SetParameterAction) => {
      state.parameters[action.payload.name] = action.payload.value;
    },
    setFractal: (state: FractalState, action: SetFractalAction) => {
      const newState = initializeFractal(
        getFractalDefinition(action.payload.name)
      );
      state.name = newState.name;
      state.parameters = newState.parameters;
    },
    resizeStage: (state: FractalState, action: ResizeStageAction) => {
      state.parameters.width = action.payload.width;
      state.parameters.height = action.payload.height;
    }
  }
});

export default fractalSlice;

export type SetParameterAction = {
  type: string;
  payload: { name: string; value: number };
};

export type SetFractalAction = {
  type: string;
  payload: { name: string };
};

export type ResizeStageAction = {
  type: string;
  payload: { width: number; height: number };
};

export function initializeFractal(fractalDef: FractalDefinition): FractalState {
  const parameterObject: { [key: string]: number } = {};
  Object.keys(fractalDef.parameters).forEach(element => {
    parameterObject[element] = fractalDef.parameters[element].default;
  });
  return {
    name: fractalDef.name,
    parameters: parameterObject
  };
}

export function getFractalDefinition(name: string): FractalDefinition {
  return fractalModels.find(e => e.name === name) || fractalModels[0];
}
