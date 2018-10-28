import { initializeFractal } from './utils';
import { pyramidFractal } from './FractalModels';

export type AppState = typeof initialState.appState;

export type FractalState = {
  name: string;
  parameters: { [key: string]: number };
};

export type State = {
  appState: AppState;
  fractalState: FractalState;
};

export const initialState = {
  appState: {
    drawerVisible: false,
    controlPanelVisible: true
  },
  fractalState: initializeFractal(pyramidFractal)
};
