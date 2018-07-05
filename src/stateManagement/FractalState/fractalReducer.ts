import { FractalActions, FractalActionTypes } from "./fractalActions";
import { initialState, FractalState } from "../model";

const fractalReducer = (
  state: FractalState = initialState.fractalState,
  action: FractalActions
) => {
  switch (action.type) {
    case FractalActionTypes.setX:
      return { ...state, x: action.payload };
    case FractalActionTypes.setY:
      return { ...state, y: action.payload };
    case FractalActionTypes.setRot:
      return { ...state, rot: action.payload };
    case FractalActionTypes.setZ:
      return { ...state, zoom: action.payload };

    default:
      return state;
  }
};

export default fractalReducer;
