import { combineReducers } from "redux";
import appReducer from "./appState/appReducer";
import fractalReducer from "./FractalState/fractalReducer";

export default combineReducers({
  appReducer,
  fractalReducer
});
