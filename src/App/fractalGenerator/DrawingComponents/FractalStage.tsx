import React, { useState, Dispatch, useCallback, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PIXI from 'pixi.js';
//@ts-ignore
import useDimensions from 'react-use-dimensions';

import FractalRenderer from './FractalRenderer';
import { useFractalReducer } from '../StateManagement/FractalContextProvider';
import {
  ResizeStage,
  FractalAction,
  ResizeStageAction
} from '../StateManagement/fractalReducer';

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
        <FractalRenderer pixiApp={pixiApp} />
      </div>
    </div>
  );
}

function usePixiApp() {
  const [_canvasRef, _setCanvasRef] = useState<HTMLDivElement | null>(null);
  // eslint-disable-next-line
  const [pixiApp, _] = useState<PIXI.Application>(
    () =>
      new PIXI.Application({
        backgroundColor: 0x1099bb,
        autoDensity: true,
        resolution: window.devicePixelRatio
      })
  );
  const canvasRef = useCallback(node => {
    _setCanvasRef(node);
  }, []);

  useLayoutEffect(() => {
    if (_canvasRef) {
      _canvasRef.appendChild(pixiApp.view);
    }
  }, [_canvasRef, pixiApp.view]);
  return { pixiApp, canvasRef };
}

function usePixiAppResize(
  pixiApp: PIXI.Application,
  dispatch: Dispatch<FractalAction>
) {
  const [ref, { height }, node] = useDimensions();
  const width = node ? node.clientWidth : 0;

  useLayoutEffect(() => {
    pixiApp.renderer.resize(width, height - 5);
    const action: ResizeStageAction = {
      type: ResizeStage,
      payload: { width, height }
    };
    dispatch(action);
  }, [width, height, pixiApp, dispatch]);
  return ref;
}

export default FractalStage;
