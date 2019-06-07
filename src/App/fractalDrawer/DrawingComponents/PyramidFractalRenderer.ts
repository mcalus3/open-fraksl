import { FractalElementsTree } from '../FractalModels';
import { endConditionFulfilled, unmountChildren } from './utils';
import * as PIXI from 'pixi.js';

type Params = {
  x: number;
  y: number;
  rot: number;
  zoom: number;
  width: number;
  height: number;
  depth: number;
};

export default function renderPyramidFractal(
  pixiApp: PIXI.Application,
  treeElement: FractalElementsTree,
  params: Params,
  Texture: PIXI.Texture
) {
  if (endConditionFulfilled(params)) {
    unmountChildren(treeElement);
  } else {
    applyTransformation(treeElement.element, params, Texture);

    renderChildren(pixiApp, treeElement.children, params, Texture);
  }
}

function applyTransformation(
  sprite: PIXI.Sprite,
  params: Params,
  texture: PIXI.Texture
) {
  const zoom = Math.pow(params.zoom, params.depth);

  sprite.tint = 0xffffff / params.depth;

  sprite.anchor.set(0.5);
  sprite.x = params.width / 2 + params.x * params.depth;
  sprite.y = params.height / 2 + params.y * params.depth;

  sprite.rotation = params.rot * params.depth;
  sprite.scale = new PIXI.Point(
    (params.width * zoom) / texture.width,
    (params.height * zoom) / texture.height
  );
}

function renderChildren(
  pixiApp: PIXI.Application,
  elements: FractalElementsTree[],
  params: Params,
  Texture: PIXI.Texture
) {
  if (elements.length === 0) {
    const newSprite = new PIXI.Sprite(Texture);
    newSprite.x = params.width;
    newSprite.y = params.height;
    pixiApp.stage.addChild(newSprite);
    elements[0] = { element: newSprite, children: [] };
  }

  renderPyramidFractal(
    pixiApp,
    elements[0],
    {
      ...params,
      depth: params.depth + 1
    },
    Texture
  );
}
