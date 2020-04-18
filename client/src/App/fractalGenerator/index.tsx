import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ControlDrawer from "./ControlComponents/ControlDrawer";
import FractalStage from "./DrawingComponents/FractalStage";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    minHeight: 0,
  },
});

export function FractalGenerator() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FractalStage />
      <ControlDrawer />
    </div>
  );
}

export { default as FractalStateProvider } from "./StateManagement/FractalContextProvider";
