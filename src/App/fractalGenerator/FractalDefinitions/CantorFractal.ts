import * as PIXI from 'pixi.js';

import { FractalElementsTree } from './index';
import { unmountChildren } from './common/sharedRenderingFunctions';
import { ColorPicker } from './common/ColorPalettes';

type Left = -1;
type Right = 1;
type Side = Left | Right;

export type CantorFractalParams =
  | {
      x: number;
      y: number;
      z: number;
      side: Side;
      zoom: number;
      width: number;
      prevWidth: number;
      height: number;
      depth: number;
    }
  | { [key: string]: number };

const cantorFractal = {
  name: 'cantor set',
  parameters: {
    x: {
      name: 'left width',
      min: 0,
      max: 1,
      default: 0.4
    },
    z: {
      name: 'right width',
      min: 0,
      max: 1,
      default: 0.6
    },
    y: {
      name: 'height',
      min: 0,
      max: 100,
      default: 30
    },
    zoom: {
      name: 'depth',
      min: 0,
      max: 15,
      default: 5,
      step: true
    }
  },
  renderingFunction: renderCantorFractal
};

function renderCantorFractal(
  pixiApp: PIXI.Application,
  treeElement: FractalElementsTree,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  const params = treeElement.params;
  if (endConditionFulfilled(params)) {
    unmountChildren(treeElement);
  } else {
    if (params.depth === 1) {
      pixiApp.stage.addChild(treeElement.sprite);
    }
    applyTransformation(treeElement.sprite, params, texture, colorPicker);

    renderChildren(pixiApp, treeElement, params, texture, colorPicker);
  }
}

function applyTransformation(
  sprite: PIXI.Sprite,
  params: CantorFractalParams,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (sprite.texture !== texture) {
    sprite.texture = texture;
  }

  sprite.tint = colorPicker(params.depth);

  if (params.depth === 1) {
    sprite.anchor.set(0, 0);
    sprite.x = 0;
    sprite.y = 0;
    sprite.rotation = 0;
    sprite.width = params.width;
    sprite.height = params.y;
  } else {
    sprite.y = params.y;
    if (params.side === -1) {
      sprite.scale = new PIXI.Point(params.x, 1);
    } else {
      sprite.x = texture.width * params.z;
      sprite.scale = new PIXI.Point(1 - params.z, 1);
    }
  }
}

function renderChildren(
  pixiApp: PIXI.Application,
  element: FractalElementsTree,
  params: CantorFractalParams,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (element.children.length < 2) {
    const newSprite = new PIXI.Sprite();
    element.sprite.addChild(newSprite);

    const newSprite2 = new PIXI.Sprite();
    element.sprite.addChild(newSprite2);

    element.children[0] = {
      sprite: newSprite,
      children: [],
      params: {
        ...params,
        side: -1,
        depth: params.depth + 1
      }
    };
    element.children[1] = {
      sprite: newSprite2,
      children: [],
      params: {
        ...params,
        side: 1,
        depth: params.depth + 1
      }
    };
  }
}

function endConditionFulfilled(params: CantorFractalParams) {
  if (params.depth > params.zoom) {
    return true;
  }
  return false;
}

export default renderCantorFractal;
export { cantorFractal };
