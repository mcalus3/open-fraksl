import { combineReducers } from "redux";
import appReducer from "./appState/appReducer";
import fractalReducer from "./FractalState/fractalReducer";
import { State } from "./model";
import { FractalActions } from "./FractalState/fractalActions";
import { AppActions } from "./appState/appActions";

export type Action = FractalActions | AppActions;

export default combineReducers<State>({
  appState: appReducer,
  fractalState: fractalReducer
});
