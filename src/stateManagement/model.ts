export type State = typeof initialState;

export const initialState = {
  appState: {
    drawerVisible: true,
    screenWidth: 0,
    screenHeight: 0
  },
  fractalState: {
    x: 0,
    y: 0
  }
};
