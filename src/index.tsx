import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, Store } from "redux";
import { Provider } from "react-redux";
import reducer from "./stateManagement/rootReducer";
import { initialState, State } from "./stateManagement/model";

const store = createStore(reducer, initialState) as Store<State>;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
