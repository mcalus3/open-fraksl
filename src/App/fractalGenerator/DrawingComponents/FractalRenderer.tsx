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
import {
  SetCurrentElementsCountAction,
  SetCurrentElementsCount
} from '../StateManagement/fractalActions';

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
  const { state: targetState, dispatch } = useFractalReducer();
  const throttledState = useThrottle(targetState, 50);
  const [previousParams, setPreviousParams] = useState({
    ...throttledState.parameters
  });
  const lastCrawlId = useRef(0);
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
        lastCrawlId.current++;
        const thisCrawlId = lastCrawlId.current;
        let currentElements = 0;
        let preventDispatch = false;

        async function iterateeFunction(
          node: FractalElementsTree,
          context: crawl.Context<FractalElementsTree>
        ) {
          if (node.children.length !== 0) {
            currentElements++;
          }
          if (performance.now() - startTime > 50) {
            await new Promise(resolve =>
              requestAnimationFrame(() => {
                console.log('dispatching partial ' + currentElements);
                dispatchCurrentElementsCount(currentElements, dispatch);
                if (lastCrawlId.current !== thisCrawlId) {
                  context.break();
                  preventDispatch = true;
                }
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
        }

        crawl(rootFractalElement.current, iterateeFunction, {
          order: 'bfs'
        }).then(() => {
          if (!preventDispatch) {
            dispatchCurrentElementsCount(currentElements, dispatch);
          }
        });
      }
    };
    Object.assign(tweenTo, throttledState.parameters);
    TweenLite.lagSmoothing(0, 0);
    TweenLite.to(currentParams, 1, tweenTo);
  }, [
    throttledState.parameters,
    throttledState.texture,
    throttledState.color,
    throttledState.name,
    currentParams,
    pixiApp,
    lastCrawlId,
    dispatch
  ]);
}

function dispatchCurrentElementsCount(currentElements: number, dispatch: any) {
  const action: SetCurrentElementsCountAction = {
    type: SetCurrentElementsCount,
    payload: { value: currentElements }
  };
  dispatch(action);
}

function FractalRenderer() {
  const { pixiApp } = usePixiApp();
  useFractalRenderer(pixiApp);
  return null;
}

export default FractalRenderer;
