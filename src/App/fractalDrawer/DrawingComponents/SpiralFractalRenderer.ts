import { FractalElementsTree } from '../FractalModels';
import { endConditionFulfilled, unmountChildren } from './drawingUtils';
import * as PIXI from 'pixi.js';
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

export default function renderSpiralFractal(
  pixiApp: PIXI.Application,
  treeElement: FractalElementsTree,
  params: Params,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (endConditionFulfilled(params)) {
    unmountChildren(treeElement);
  } else {
    applyTransformation(treeElement.element, params, texture, colorPicker);

    renderChildren(pixiApp, treeElement.children, params, texture, colorPicker);
  }
}

function applyTransformation(
  sprite: PIXI.Sprite,
  params: Params,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  const zoom = Math.pow(params.zoom, params.depth);

  sprite.tint = colorPicker(params.depth);

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
  Texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (elements.length === 0) {
    const newSprite = new PIXI.Sprite(Texture);
    newSprite.x = params.width;
    newSprite.y = params.height;
    pixiApp.stage.addChild(newSprite);
    elements[0] = { element: newSprite, children: [] };
  }

  renderSpiralFractal(
    pixiApp,
    elements[0],
    {
      ...params,
      depth: params.depth + 1
    },
    Texture,
    colorPicker
  );
}
