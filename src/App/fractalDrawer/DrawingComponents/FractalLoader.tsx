import { useRef, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';

import { FractalElementsTree } from '../FractalModels';
import { getFractalDefinition } from '../fractalReducer';
import { useFractalReducer } from '../FractalContext';
const anime = require('animejs').default;
const starterElement = {
  element: new PIXI.Sprite(PIXI.Texture.WHITE),
  children: []
};

function useRenderFractal(pixiApp: PIXI.Application) {
  const { state: targetState } = useFractalReducer();
  const [previousParams, setPreviousParams] = useState(targetState.parameters);
  let currentParams = previousParams;
  const rootFractalElement = useRef<FractalElementsTree>(starterElement);
  let moved = useRef<boolean>(false);
  useEffect(() => {
    if (moved.current) {
      anime.remove(currentParams);
      moved.current = false;
    }
    anime({
      targets: currentParams,
      x: targetState.parameters.x,
      y: targetState.parameters.y,
      rot: targetState.parameters.rot,
      zoom: targetState.parameters.zoom,
      round: 1000,
      easing: 'easeOutQuart',
      update: function() {
        moved.current = true;
        setPreviousParams(currentParams);
        getFractalDefinition(targetState.name).renderingFunction(
          pixiApp,
          rootFractalElement.current,
          {
            ...currentParams,
            depth: 1,
            zoom: currentParams.zoom / (currentParams.zoom + 1),
            width: Math.floor(pixiApp.screen.width),
            height: Math.floor(pixiApp.screen.height)
          },
          targetState.texture
        );
      }
    });
  }, [targetState, currentParams, pixiApp]);
}

type Props = {
  pixiApp: PIXI.Application;
};

function FractalLoader({ pixiApp }: Props) {
  useRenderFractal(pixiApp);
  return null;
}

export default FractalLoader;
