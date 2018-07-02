import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import ReduxRoot from "./stateManagement/ReduxRoot";

ReactDOM.render(
  <ReduxRoot />,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
