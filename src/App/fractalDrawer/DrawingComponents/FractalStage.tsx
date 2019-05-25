import React, { useRef, useEffect, MutableRefObject, Dispatch } from 'react';
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

function useMountPixiApp(
  size: Size,
  pixiApp: MutableRefObject<PIXI.Application | undefined>,
  canvasRef: MutableRefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    pixiApp.current = new PIXI.Application({
      width: size.width,
      height: size.height,
      backgroundColor: OPTIONS.backgroundColor
    });
    if (canvasRef.current) {
      canvasRef.current.appendChild(pixiApp.current.view);
    }
    // eslint-disable-next-line
  }, []);
}

function useResizeCanvasDiv(
  size: Size,
  pixiApp: MutableRefObject<PIXI.Application | undefined>,
  dispatch: Dispatch<FractalAction>
) {
  useEffect(() => {
    if (pixiApp.current !== undefined) {
      pixiApp.current.renderer.resize(size.width, size.height - 5);
      const action: ResizeStageAction = {
        type: ResizeStage,
        payload: { width: size.width, height: size.height }
      };
      dispatch(action);
    }
  }, [size.width, size.height, pixiApp, dispatch]);
}

function FractalStage() {
  const classes = useStyles();
  const { dispatch } = useFractalReducer();
  const pixiApp = useRef<PIXI.Application>();
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [sizeRef, { width, height }] = useDimensions();
  useMountPixiApp({ width, height }, pixiApp, canvasRef);
  useResizeCanvasDiv({ width, height }, pixiApp, dispatch);

  return (
    <div className={classes.stage} ref={sizeRef}>
      <div className={classes.stage} ref={canvasRef}>
        {pixiApp.current === undefined ? null : (
          <FractalLoader pixiApp={pixiApp.current} />
        )}
      </div>
    </div>
  );
}

export default FractalStage;
