import { useRef, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';

import { FractalElementsTree } from '../FractalDefinitions';
import { getFractalDefinition } from '../StateManagement/fractalReducer';
import {
  useFractalReducer,
  usePixiApp
} from '../StateManagement/FractalContextProvider';
import { TweenLite, Power3 } from 'gsap';

const starterElement: FractalElementsTree = {
  sprite: new PIXI.Sprite(PIXI.Texture.WHITE),
  children: []
};

function useFractalRenderer(pixiApp: PIXI.Application) {
  const { state: targetState } = useFractalReducer();
  const [previousParams, setPreviousParams] = useState({
    ...targetState.parameters
  });
  let currentParams = previousParams;
  const rootFractalElement = useRef<FractalElementsTree>(starterElement);
  useEffect(() => {
    const tweenTo = {
      ease: Power3.easeOut,
      onUpdate: () => {
        setPreviousParams(currentParams);
        getFractalDefinition(targetState.name).renderingFunction(
          pixiApp,
          rootFractalElement.current,
          {
            ...currentParams,
            depth: 1,
            zoom: currentParams.zoom,
            width: Math.floor(pixiApp.screen.width),
            height: Math.floor(pixiApp.screen.height)
          },
          targetState.texture.texture,
          targetState.color.pick
        );
      }
    };
    Object.assign(tweenTo, targetState.parameters);
    TweenLite.to(currentParams, 1, tweenTo);
  }, [targetState, currentParams, pixiApp]);
}

function FractalRenderer() {
  const { pixiApp } = usePixiApp();
  useFractalRenderer(pixiApp);
  return null;
}

export default FractalRenderer;
