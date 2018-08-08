import { FractalActions, FractalActionTypes } from "./fractalActions";
import { initialState, FractalState } from "../StateModel";
import { getFractalDefinition, initializeFractal } from "../utils";

const fractalReducer = (
  state: FractalState = initialState.fractalState,
  action: FractalActions
) => {
  switch (action.type) {
    case FractalActionTypes.setParameter:
      const newState = {
        ...state,
        parameters: { ...state.parameters }
      };

      newState.parameters[action.payload.name] = action.payload.value;
      return newState;

    case FractalActionTypes.changeFractal:
      return initializeFractal(getFractalDefinition(action.payload.name));

    default:
      return state;
  }
};

export default fractalReducer;
