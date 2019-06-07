import * as PIXI from 'pixi.js';
import {
  pyramidFractal,
  FractalDefinition,
  fractalModels
} from './FractalModels';

export const fractalInitialState = initializeFractal(pyramidFractal);

export type FractalParams = { zoom: number; [key: string]: number };
export type FractalState = {
  name: string;
  parameters: FractalParams;
  texture: PIXI.Texture;
};

export const SetParameter = 'SET_PARAMETER';
export const SetFractal = 'SET_FRACTAL';
export const SetFractalTexture = 'SET_FRACTAL_TEXTURE';
export const ResizeStage = 'RESIZE_STAGE';

export type SetParameterAction = {
  type: typeof SetParameter;
  payload: { name: string; value: number };
};

export type SetFractalAction = {
  type: typeof SetFractal;
  payload: { name: string };
};

export type SetFractalTextureAction = {
  type: typeof SetFractalTexture;
  payload: { texture: PIXI.Texture };
};

export type ResizeStageAction = {
  type: typeof ResizeStage;
  payload: { width: number; height: number };
};

export type FractalAction =
  | SetParameterAction
  | SetFractalAction
  | ResizeStageAction
  | SetFractalTextureAction;

export function initializeFractal(fractalDef: FractalDefinition): FractalState {
  const parameterObject: FractalParams = { zoom: 0, width: 0, height: 0 };
  Object.keys(fractalDef.parameters).forEach(element => {
    parameterObject[element] = fractalDef.parameters[element].default;
  });

  return {
    name: fractalDef.name,
    parameters: parameterObject,
    texture: PIXI.Texture.WHITE
  };
}

export function getFractalDefinition(name: string): FractalDefinition {
  return fractalModels.find(e => e.name === name) || fractalModels[0];
}

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
      return newState;

    case SetFractalTexture:
      newState = { ...state, texture: action.payload.texture };
      return newState;

    case ResizeStage:
      newState.parameters.width = action.payload.width;
      newState.parameters.height = action.payload.height;
      return newState;
  }
}

export default fractalReducer;
