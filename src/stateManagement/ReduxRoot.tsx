import * as React from "react";
import App from "../components/App";
import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import appReducer from "./appState/appReducer";
import fractalReducer from "./FractalState/fractalReducer";
import { State } from "./StateModel";
import { FractalActions } from "./FractalState/fractalActions";
import { AppActions, Actions } from "./appState/appActions";

const logger = (createLogger as any)();

let middleware = applyMiddleware(logger, thunk);

if (process.env.NODE_ENV === "development") {
  middleware = composeWithDevTools(middleware);
}

const rootReducer = combineReducers<State>({
  appState: appReducer,
  fractalState: fractalReducer
});

const store = createStore(rootReducer, {}, middleware) as Store<State>;

window.addEventListener("resize", () => {
  store.dispatch(Actions.Resize(window.innerWidth, window.innerHeight));
});
store.dispatch(Actions.Resize(window.innerWidth, window.innerHeight));

function ReduxRoot() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export type Action = FractalActions | AppActions;

export default ReduxRoot;
