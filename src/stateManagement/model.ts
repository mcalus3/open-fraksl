export type State = typeof initialState;
export type FractalState = typeof initialState.fractalState;
export type AppState = typeof initialState.appState;

export const initialState = {
  appState: {
    drawerVisible: false,
    controlPanelVisible: true,
    screenWidth: 0,
    screenHeight: 0
  },
  fractalState: {
    x: 0,
    y: 0,
    rot: 0.1,
    zoom: 0.8
  }
};
