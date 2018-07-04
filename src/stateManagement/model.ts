export type State = typeof initialState;

export const initialState = {
  appState: {
    drawerVisible: false,
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
