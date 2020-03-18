import { FractalTexture } from "../FractalDefinitions/common/FractalTextures";
import { ColorDefinition } from "../FractalDefinitions/common/ColorPalettes";

export const SetParameter = "SET_PARAMETER";
export const SetFractal = "SET_FRACTAL";
export const SetFractalTexture = "SET_FRACTAL_TEXTURE";
export const SetFractalColor = "SET_FRACTAL_COLOR";
export const ResizeStage = "RESIZE_STAGE";
export const SetTotalElementsCount = "SET_TOTAL_ELEMENTS_COUNT";
export const SetCurrentElementsCount = "SET_CURRENT_ELEMENTS_COUNT";

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
  payload: FractalTexture;
};

export type SetFractalColorAction = {
  type: typeof SetFractalColor;
  payload: { palette: ColorDefinition };
};

export type ResizeStageAction = {
  type: typeof ResizeStage;
  payload: { width: number; height: number };
};

export type SetTotalElementsCountAction = {
  type: typeof SetTotalElementsCount;
  payload: { value: number };
};

export type SetCurrentElementsCountAction = {
  type: typeof SetCurrentElementsCount;
  payload: { value: number };
};

export type FractalAction =
  | SetParameterAction
  | SetFractalAction
  | ResizeStageAction
  | SetFractalColorAction
  | SetFractalTextureAction
  | SetTotalElementsCountAction
  | SetCurrentElementsCountAction;
