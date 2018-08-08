import { AppActions, AppActionTypes } from "./appActions";
import { initialState, AppState } from "../StateModel";

const appReducer = (
  state: AppState = initialState.appState,
  action: AppActions
) => {
  switch (action.type) {
    case AppActionTypes.toggleDrawer:
      return { ...state, drawerVisible: !state.drawerVisible };
    case AppActionTypes.toggleDrawer:
      return { ...state, controlPanelVisible: !state.controlPanelVisible };
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
