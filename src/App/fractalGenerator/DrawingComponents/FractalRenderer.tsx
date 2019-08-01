import { useRef, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';

import { FractalElementsTree } from '../FractalDefinitions';
import { getFractalDefinition } from '../StateManagement/fractalReducer';
import {
  useFractalReducer,
  usePixiApp
} from '../StateManagement/FractalContextProvider';
import { TweenLite, Power3, TweenMax } from 'gsap';
//@ts-ignore
import { useThrottle } from 'use-throttle';

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
  const throttledState = useThrottle(targetState, 50);
  const [previousParams, setPreviousParams] = useState({
    ...throttledState.parameters
  });
  let currentParams = previousParams;
  const rootFractalElement = useRef<FractalElementsTree>(
    getStarterElement(pixiApp)
  );
  useEffect(() => {
    TweenMax.getAllTweens().forEach(element => {
        element.kill()
    });
    const tweenTo = {
      ease: Power3.easeOut,
      onUpdate: () => {
        setPreviousParams(currentParams);
        getFractalDefinition(throttledState.name).renderingFunction(
          pixiApp,
          rootFractalElement.current,
          {
            ...currentParams,
            depth: 1,
            width: Math.floor(pixiApp.screen.width),
            height: Math.floor(pixiApp.screen.height)
          },
          throttledState.texture.texture,
          throttledState.color.pick
        );
      }
    };
    Object.assign(tweenTo, throttledState.parameters);
    TweenLite.to(currentParams, 1, tweenTo);
  }, [throttledState, currentParams, pixiApp]);
}

function FractalRenderer() {
  const { pixiApp } = usePixiApp();
  useFractalRenderer(pixiApp);
  return null;
}

export default FractalRenderer;
