import { createAction, ActionsUnion } from '../utils';

export enum FractalActionTypes {
  setParameter = 'SET_Parameter',
  changeFractal = 'CHANGE_FRACTAL',
  resize = 'RESIZE'
}

export const Actions = {
  setParameter: (name: string, value: number) =>
    createAction(FractalActionTypes.setParameter, { name, value }),
  ChangeFractal: (name: string) =>
    createAction(FractalActionTypes.changeFractal, { name }),
  Resize: (width: number, height: number) =>
    createAction(FractalActionTypes.resize, { width, height })
};

export type FractalActions = ActionsUnion<typeof Actions>;
