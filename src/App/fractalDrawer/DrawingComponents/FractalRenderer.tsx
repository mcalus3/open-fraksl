import { useRef, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';

import { FractalElementsTree } from '../FractalModels';
import { getFractalDefinition } from '../fractalReducer';
import { useFractalReducer } from '../FractalContext';
import { TweenLite, Power3 } from 'gsap';

const starterElement: FractalElementsTree = {
  sprite: new PIXI.Sprite(PIXI.Texture.WHITE),
  children: []
};

function useRenderFractal(pixiApp: PIXI.Application) {
  const { state: targetState } = useFractalReducer();
  const [previousParams, setPreviousParams] = useState(targetState.parameters);
  let currentParams = previousParams;
  const rootFractalElement = useRef<FractalElementsTree>(starterElement);
  useEffect(() => {
    TweenLite.to(currentParams, 1, {
      x: targetState.parameters.x,
      y: targetState.parameters.y,
      rot: targetState.parameters.rot,
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
            zoom: currentParams.zoom / (currentParams.zoom + 1),
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
  useRenderFractal(pixiApp);
  return null;
}

export default FractalRenderer;
