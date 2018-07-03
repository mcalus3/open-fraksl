import { AppActions, AppActionTypes } from "./appActions";
import { initialState } from "../model";

const appReducer = (state = initialState.appState, action: AppActions) => {
  switch (action.type) {
    case AppActionTypes.toggleDrawer:
      return { ...state, drawerVisible: !state.drawerVisible };
    case AppActionTypes.resize:
      return {
        ...state,
        screenWidth: action.payload.width,
        screenHeight: action.payload.height
      };

    default:
      return state;
  }
};

export default appReducer;
