import { AppActions, AppActionTypes } from './appActions';
import { initialState, AppState } from '../StateModel';

const appReducer = (
  state: AppState = initialState.appState,
  action: AppActions
) => {
  switch (action.type) {
    case AppActionTypes.toggleDrawer:
      return { ...state, drawerVisible: !state.drawerVisible };
    case AppActionTypes.toggleDrawer:
      return { ...state, controlPanelVisible: !state.controlPanelVisible };

    default:
      return state;
  }
};

export default appReducer;
