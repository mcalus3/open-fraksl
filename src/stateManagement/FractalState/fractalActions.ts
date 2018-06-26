import {createAction, ActionsUnion} from '../utils';

export enum FractalActionTypes {
    setX = 'SET_X'
};

export const Actions = {
    setX: (x: number) => createAction(FractalActionTypes.setX, x)
};

export type FractalActions = ActionsUnion<typeof Actions>;