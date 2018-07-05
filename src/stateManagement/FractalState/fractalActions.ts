import { createAction, ActionsUnion } from "../utils";

export enum FractalActionTypes {
  setX = "SET_X",
  setY = "SET_Y",
  setRot = "SET_ROT",
  setZ = "SET_Z"
}

export const Actions = {
  setX: (x: number) => createAction(FractalActionTypes.setX, x),
  setY: (y: number) => createAction(FractalActionTypes.setY, y),
  setRot: (r: number) => createAction(FractalActionTypes.setRot, r),
  setZ: (z: number) => createAction(FractalActionTypes.setZ, z)
};

export type FractalActions = ActionsUnion<typeof Actions>;
