import * as React from 'react';
import * as PIXI from 'pixi.js';
import fractalReducer, {
  FractalState,
  fractalInitialState
} from './fractalReducer';
import { FractalAction } from './fractalActions';

type CountProviderProps = { children: React.ReactNode };

const CountStateContext = React.createContext<FractalState | undefined>(
  undefined
);
const CountDispatchContext = React.createContext<
  React.Dispatch<FractalAction> | undefined
>(undefined);
const PixiContext = React.createContext<
  | { pixiApp: PIXI.Application; canvasRef: (node: HTMLDivElement) => void }
  | undefined
>(undefined);

function FractalStateProvider({ children }: CountProviderProps) {
  const [state, dispatch] = React.useReducer(
    fractalReducer,
    fractalInitialState
  );
  const pixi = useCreatePixiApp();

  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        <PixiContext.Provider value={pixi}>{children}</PixiContext.Provider>
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
}

function useCreatePixiApp() {
  const [_canvasRef, _setCanvasRef] = React.useState<HTMLDivElement | null>(
    null
  );
  // eslint-disable-next-line
  const [pixiApp, _] = React.useState<PIXI.Application>(
    () =>
      new PIXI.Application({
        backgroundColor: 0x00acc1,
        autoDensity: true,
        resolution: window.devicePixelRatio
      })
  );
  const canvasRef = React.useCallback((node: HTMLDivElement) => {
    _setCanvasRef(node);
  }, []);

  React.useLayoutEffect(() => {
    if (_canvasRef) {
      _canvasRef.appendChild(pixiApp.view);
    }
  }, [_canvasRef, pixiApp.view]);
  return { pixiApp, canvasRef };
}

function useFractalState() {
  const context = React.useContext(CountStateContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
}

function useFractalDispatch() {
  const context = React.useContext(CountDispatchContext);
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider');
  }
  return context;
}

function useFractalReducer() {
  return { state: useFractalState(), dispatch: useFractalDispatch() };
}

function usePixiApp() {
  const context = React.useContext(PixiContext);
  if (context === undefined) {
    throw new Error('usePixiApp must be used within a PixiProvider');
  }
  return context;
}

export default FractalStateProvider;
export { useFractalReducer, usePixiApp };
