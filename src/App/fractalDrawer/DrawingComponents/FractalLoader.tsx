import { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';

import { FractalElementsTree } from '../FractalModels';
import { getFractalDefinition } from '../fractalReducer';
import { useFractalReducer } from '../FractalContext';

const starterElement = {
  element: new PIXI.Sprite(PIXI.Texture.WHITE),
  children: []
};

function useRenderFractal(pixiApp: PIXI.Application) {
  const { state } = useFractalReducer();
  const rootFractalElement = useRef<FractalElementsTree>(starterElement);
  useEffect(() => {
    getFractalDefinition(state.name).renderingFunction(
      pixiApp,
      rootFractalElement.current,
      {
        ...state.parameters,
        depth: 1,
        zoom: state.parameters.zoom / (state.parameters.zoom + 1),
        width: Math.floor(pixiApp.screen.width),
        height: Math.floor(pixiApp.screen.height)
      }
    );
  }, [state, pixiApp]);
}

type Props = {
  pixiApp: PIXI.Application;
};

function FractalLoader({ pixiApp }: Props) {
  useRenderFractal(pixiApp);
  return null;
}

export default FractalLoader;
