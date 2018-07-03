import { createAction, ActionsUnion } from "../utils";

export enum FractalActionTypes {
  setX = "SET_X",
  setY = "SET_Y"
}

export const Actions = {
  setX: (x: number) => createAction(FractalActionTypes.setX, x),
  setY: (y: number) => createAction(FractalActionTypes.setY, y)
};

export type FractalActions = ActionsUnion<typeof Actions>;
