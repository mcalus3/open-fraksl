import { useRef, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';

import { FractalElementsTree } from '../FractalDefinitions';
import { getFractalDefinition } from '../StateManagement/fractalReducer';
import {
  useFractalReducer,
  usePixiApp
} from '../StateManagement/FractalContextProvider';
import { TweenLite, Power3 } from 'gsap';
//@ts-ignore
import { useThrottle } from 'use-throttle';
import crawl from '../../../tree-crawl';

const getStarterElement = (pixiApp: PIXI.Application) => {
  const element = {
    sprite: new PIXI.Sprite(),
    children: [],
    params: {}
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
    TweenLite.killTweensOf(currentParams);

    const tweenTo = {
      ease: Power3.easeOut,
      onUpdate: () => {
        setPreviousParams(currentParams);
        rootFractalElement.current.params = {
          ...currentParams,
          depth: 1,
          width: Math.floor(pixiApp.screen.width),
          height: Math.floor(pixiApp.screen.height)
        };
        const render = getFractalDefinition(throttledState.name)
          .renderingFunction;

        let startTime = performance.now();
        crawl(
          rootFractalElement.current,
          async node => {
            if (performance.now() - startTime > 100) {
              await new Promise(resolve =>
                requestAnimationFrame(() => {
                  startTime = performance.now();
                  resolve();
                })
              );
            }
            render(
              pixiApp,
              node,
              throttledState.texture.texture,
              throttledState.color.pick
            );
          },
          { order: 'bfs' }
        );
      }
    };
    Object.assign(tweenTo, throttledState.parameters);
    TweenLite.lagSmoothing(0, 0);
    TweenLite.to(currentParams, 1, tweenTo);
  }, [throttledState, currentParams, pixiApp]);
}

function FractalRenderer() {
  const { pixiApp } = usePixiApp();
  useFractalRenderer(pixiApp);
  return null;
}

export default FractalRenderer;
