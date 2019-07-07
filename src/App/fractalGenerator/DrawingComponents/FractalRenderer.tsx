import { useRef, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';

import { FractalElementsTree } from '../FractalDefinitions';
import { getFractalDefinition } from '../StateManagement/fractalReducer';
import { useFractalReducer } from '../StateManagement/FractalContextProvider';
import { TweenLite, Power3 } from 'gsap';

const starterElement: FractalElementsTree = {
  sprite: new PIXI.Sprite(PIXI.Texture.WHITE),
  children: []
};

function useFractalRenderer(pixiApp: PIXI.Application) {
  const { state: targetState } = useFractalReducer();
  const [previousParams, setPreviousParams] = useState(targetState.parameters);
  let currentParams = previousParams;
  const rootFractalElement = useRef<FractalElementsTree>(starterElement);
  useEffect(() => {
    TweenLite.to(currentParams, 1, {
      x: targetState.parameters.x,
      y: targetState.parameters.y,
      rotation: targetState.parameters.rotation,
      zoom: targetState.parameters.zoom,
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
    });
  }, [targetState, currentParams, pixiApp]);
}

type Props = {
  pixiApp: PIXI.Application;
};

function FractalRenderer({ pixiApp }: Props) {
  useFractalRenderer(pixiApp);
  return null;
}

export default FractalRenderer;
