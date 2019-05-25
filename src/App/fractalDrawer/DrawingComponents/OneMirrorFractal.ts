import * as PIXI from 'pixi.js';

import { FractalElementsTree } from '../FractalModels';
import { endConditionFulfilled, unmountChildren } from './utils';

type Params = {
  x: number;
  y: number;
  rot: number;
  zoom: number;
  width: number;
  height: number;
  depth: number;
};

export default function renderOneMirrorFractal(
  pixiApp: PIXI.Application,
  treeElement: FractalElementsTree,
  params: Params
) {
  if (endConditionFulfilled(params)) {
    unmountChildren(treeElement);
  } else {
    applyTransformation(treeElement.element as PIXI.Sprite, params);

    renderChildren(pixiApp, treeElement, params);
  }
}

function applyTransformation(sprite: PIXI.Sprite, params: Params) {
  sprite.tint = 0xffffff / params.depth;

  sprite.anchor.set(0.5);
  sprite.x = params.width / 2 + params.x;
  sprite.y = params.height / 2 + params.y;

  sprite.rotation = params.rot;
  sprite.scale = new PIXI.Point(params.width / 10, params.height / 10);
}

function renderChildren(
  pixiApp: PIXI.Application,
  element: FractalElementsTree,
  params: Params
) {
  if (element.children.length === 0) {
    const newSprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    element.element.addChild(newSprite);
    element.children[0] = { element: newSprite, children: [] };
  }

  renderOneMirrorFractal(pixiApp, element.children[0], {
    ...params,
    width: params.width * params.zoom,
    height: params.height * params.zoom,
    depth: params.depth + 1
  });
}
