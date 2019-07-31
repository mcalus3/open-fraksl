import { useRef, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';

import { FractalElementsTree } from '../FractalDefinitions';
import { getFractalDefinition } from '../StateManagement/fractalReducer';
import {
  useFractalReducer,
  usePixiApp
} from '../StateManagement/FractalContextProvider';
import { TweenLite, Power3 } from 'gsap';

const getStarterElement = (pixiApp: PIXI.Application) => {
  const element = {
    sprite: new PIXI.Sprite(),
    children: []
  };

  pixiApp.stage.addChild(element.sprite);
  return element;
};

function useFractalRenderer(pixiApp: PIXI.Application) {
  const { state: targetState } = useFractalReducer();
  const [previousParams, setPreviousParams] = useState({
    ...targetState.parameters
  });
  let currentParams = previousParams;
  const rootFractalElement = useRef<FractalElementsTree>(
    getStarterElement(pixiApp)
  );
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
