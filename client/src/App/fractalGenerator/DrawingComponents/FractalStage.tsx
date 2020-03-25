import React, { Dispatch, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as PIXI from "pixi.js";
//@ts-ignore
import useDimensions from "react-use-dimensions";

import FractalRenderer from "./FractalRenderer";
import {
  useFractalReducer,
  usePixiApp
} from "../StateManagement/FractalContextProvider";
import { FractalAction } from "../StateManagement/fractalActions";

const useStyles = makeStyles({
  stage: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    minHeight: 0
  }
});

function FractalStage() {
  const classes = useStyles();
  const { dispatch } = useFractalReducer();
  const { pixiApp, canvasRef } = usePixiApp();
  const sizeRef = usePixiAppResize(pixiApp, dispatch);

  return (
    <div className={classes.stage} ref={sizeRef}>
      <div className={classes.stage} ref={canvasRef}>
        <FractalRenderer />
      </div>
    </div>
  );
}

function usePixiAppResize(
  pixiApp: PIXI.Application,
  dispatch: Dispatch<FractalAction>
) {
  const [ref, { height }, node] = useDimensions();
  const width = node ? node.clientWidth : 0;

  useLayoutEffect(() => {
    pixiApp.renderer.resize(width, height - 5);
    dispatch({
      type: "RESIZE_STAGE",
      payload: { width, height }
    });
  }, [width, height, pixiApp, dispatch]);
  return ref;
}

export default FractalStage;
