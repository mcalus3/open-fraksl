import { FractalDefinition, fractalModels } from "./FractalModels";
import { FractalState } from "./StateModel";

type FunctionType = (...args: any[]) => any;
type IActionCreatorsMapObject = { [actionCreator: string]: FunctionType };

export type ActionsUnion<A extends IActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>;

export interface IAction<T extends string> {
  type: T;
}
export interface IActionWithPayload<T extends string, P> extends IAction<T> {
  payload: P;
}

export function createAction<T extends string>(type: T): IAction<T>;
export function createAction<T extends string, P>(
  type: T,
  payload: P
): IActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload };
}

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
