import * as PIXI from 'pixi.js';

import { FractalElementsTree } from '../FractalModels';
import { unmountChildren } from './drawingUtils';
import { ColorPicker } from '../ColorPalettes';

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
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (endConditionFilfulled(params)) {
    unmountChildren(treeElement);
  } else {
    applyTransformation(
      treeElement.sprite as PIXI.Sprite,
      params,
      texture,
      colorPicker
    );

    renderChildren(pixiApp, treeElement, params, texture, colorPicker);
  }
}

function applyTransformation(
  sprite: PIXI.Sprite,
  params: Params,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  sprite.tint = colorPicker(params.depth);
  if (sprite.texture !== texture) {
    sprite.texture = texture;
  }

  sprite.anchor.set(0.5);
  sprite.x = params.width / 2 + params.x;
  sprite.y = params.height / 2 + params.y;

  sprite.rotation = params.rot;
  sprite.scale = new PIXI.Point(
    params.width / texture.width,
    params.height / texture.height
  );
}

function renderChildren(
  pixiApp: PIXI.Application,
  element: FractalElementsTree,
  params: Params,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (element.children.length === 0) {
    const newSprite = new PIXI.Sprite(texture);
    newSprite.x = pixiApp.stage.width;
    newSprite.y = pixiApp.stage.height;

    pixiApp.stage.addChild(newSprite);
    element.children[0] = { sprite: newSprite, children: [] };
  }

  renderPyramidFractal(
    pixiApp,
    element.children[0],
    {
      ...params,
      width: params.width * params.zoom,
      height: params.height * params.zoom,
      depth: params.depth + 1
    },
    texture,
    colorPicker
  );
}

function endConditionFilfulled(params: Params) {
  return Math.min(params.height, params.width) < 1 || params.depth > 5000;
}
