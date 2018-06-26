import { AppActions, AppActionTypes } from './appActions';
import { initialState } from '../model';

const appReducer = (state = initialState.appState, action: AppActions) => {
  switch (action.type) {

    case AppActionTypes.toggleDrawer:
      return {...state, drawerVisible: !state.drawerVisible}

      default:
      return state
  };
};

export default appReducer;
