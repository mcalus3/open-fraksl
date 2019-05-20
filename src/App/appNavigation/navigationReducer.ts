import { createSlice } from 'redux-starter-kit';

export const navigationState = {
  drawerVisible: false
};
export type NavigationState = typeof navigationState;

const navigationSlice = createSlice({
  initialState: navigationState,
  reducers: {
    toggleDrawer: (state: NavigationState) => {
      state.drawerVisible = !state.drawerVisible;
    }
  }
});

export type ToggleDrawerAction = { type: string };

export default navigationSlice;
