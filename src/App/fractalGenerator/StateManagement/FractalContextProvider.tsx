import * as React from 'react';
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

function FractalStateProvider({ children }: CountProviderProps) {
  const [state, dispatch] = React.useReducer(
    fractalReducer,
    fractalInitialState
  );

  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
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

export default FractalStateProvider;
export { useFractalReducer };
