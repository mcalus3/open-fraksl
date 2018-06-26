import { FractalActions, FractalActionTypes } from './fractalActions';
import { initialState } from '../model';

const fractalReducer = (state = initialState.fractalState, action: FractalActions) => {
  switch (action.type) {

    case FractalActionTypes.setX:
      return {...state, x: action.payload}

      default:
      return state
  };
};

export default fractalReducer;