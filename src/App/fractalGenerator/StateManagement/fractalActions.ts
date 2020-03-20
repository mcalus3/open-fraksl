import { FractalTexture } from "../FractalDefinitions/common/FractalTextures";
import { ColorDefinition } from "../FractalDefinitions/common/ColorPalettes";
import { FractalLoadData } from "./fractalLoader";

export type SetParameterAction = {
  type: "SET_PARAMETER";
  payload: { name: string; value: number };
};

export type SetFractalTypeAction = {
  type: "SET_FRACTAL_TYPE";
  payload: { name: string };
};

export type SetFractalTextureAction = {
  type: "SET_FRACTAL_TEXTURE";
  payload: FractalTexture;
};

export type SetFractalColorAction = {
  type: "SET_FRACTAL_COLOR";
  payload: { palette: ColorDefinition };
};

export type ResizeStageAction = {
  type: "RESIZE_STAGE";
  payload: { width: number; height: number };
};

export type SetTotalElementsCountAction = {
  type: "SET_TOTAL_ELEMENTS_COUNT";
  payload: { value: number };
};

export type SetCurrentElementsCountAction = {
  type: "SET_CURRENT_ELEMENTS_COUNT";
  payload: { value: number };
};

export type SetFractalAction = {
  type: "SET_FRACTAL";
  payload: { data: FractalLoadData };
};

export type FractalAction =
  | SetParameterAction
  | SetFractalTypeAction
  | ResizeStageAction
  | SetFractalColorAction
  | SetFractalTextureAction
  | SetTotalElementsCountAction
  | SetCurrentElementsCountAction
  | SetFractalAction;
