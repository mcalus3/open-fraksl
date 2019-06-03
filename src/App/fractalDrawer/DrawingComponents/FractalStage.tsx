import React, {
  useRef,
  useState,
  useEffect,
  MutableRefObject,
  Dispatch
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FractalLoader from './FractalLoader';
import * as PIXI from 'pixi.js';
//@ts-ignore
import useDimensions from 'react-use-dimensions';
import { useFractalReducer } from '../FractalContext';
import {
  ResizeStage,
  FractalAction,
  ResizeStageAction
} from '../fractalReducer';

const OPTIONS = {
  backgroundColor: 0x1099bb
};

const useStyles = makeStyles({
  stage: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    minHeight: 0
  }
});

type Size = {
  width: number;
  height: number;
};

function FractalStage() {
  const classes = useStyles();
  const { dispatch } = useFractalReducer();
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [sizeRef, { width, height }] = useDimensions();
  const pixiApp = useMountPixiApp({ width, height }, canvasRef);
  useResizeCanvasDiv({ width, height }, pixiApp, dispatch);

  return (
    <div className={classes.stage} ref={sizeRef}>
      <div className={classes.stage} ref={canvasRef}>
        <FractalLoader pixiApp={pixiApp} />
      </div>
    </div>
  );
}

function useMountPixiApp(
  size: Size,
  canvasRef: MutableRefObject<HTMLDivElement | null>
) {
  // eslint-disable-next-line
  const [pixiApp, _] = useState<PIXI.Application>(getPixiApp(size));
  useEffect(() => {
    canvasRef.current!.appendChild(pixiApp.view);
  }, [canvasRef, pixiApp]);
  return pixiApp;
}

function useResizeCanvasDiv(
  size: Size,
  pixiApp: PIXI.Application,
  dispatch: Dispatch<FractalAction>
) {
  useEffect(() => {
    pixiApp.renderer.resize(size.width, size.height - 5);
    const action: ResizeStageAction = {
      type: ResizeStage,
      payload: { width: size.width, height: size.height }
    };
    dispatch(action);
  }, [size.width, size.height, pixiApp, dispatch]);
}

function getPixiApp(size: Size): () => PIXI.Application {
  return () =>
    new PIXI.Application({
      width: size.width,
      height: size.height,
      backgroundColor: OPTIONS.backgroundColor
    });
}

export default FractalStage;
