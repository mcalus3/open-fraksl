import * as PIXI from 'pixi.js';

import { FractalElementsTree } from './index';
import { unmountChildren } from './common/sharedRenderingFunctions';
import { ColorPicker } from './common/ColorPalettes';

export type SierpinskiTreeFractalParams =
  | {
      length: number;
      ratio: number;
      angle: number;
      zoom: number;
      width: number;
      height: number;
      depth: number;
      x: number;
      y: number;
    }
  | { [key: string]: number };

const sierpinskiTreeFractal = {
  name: 'Sierpinski tree',
  parameters: {
    length: {
      name: 'length',
      min: 0,
      max: 1,
      default: 0.25
    },
    ratio: {
      name: 'ratio',
      min: 0,
      max: 1,
      default: 0.7
    },
    angle: {
      name: 'angle',
      min: 0,
      max: Math.PI,
      default: Math.PI / 4
    },
    zoom: {
      name: 'depth',
      min: 0,
      max: 13,
      default: 5
    }
  },
  renderingFunction: renderSierpinskiTreeFractal
};

function renderSierpinskiTreeFractal(
  pixiApp: PIXI.Application,
  treeElement: FractalElementsTree,
  params: SierpinskiTreeFractalParams,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
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
  params: SierpinskiTreeFractalParams,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (sprite.texture !== texture) {
    sprite.texture = texture;
  }

  sprite.tint = colorPicker(params.depth);

  sprite.anchor.set(0.5, 1);

  if (params.depth === 1) {
    // sprite.scale = new PIXI.Point(10 * params.length, 10 * params.length);
    // sprite.width = 10;
    // sprite.height = params.length * params.height;

    sprite.x = params.width / 2;
    sprite.y = params.height;
    sprite.rotation = 0;
  } else {
    sprite.rotation = params.angle;
    sprite.scale.set(1, params.ratio);
    sprite.y = -texture.height;
  }
}

function renderChildren(
  pixiApp: PIXI.Application,
  element: FractalElementsTree,
  params: SierpinskiTreeFractalParams,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (element.children.length < 2) {
    const newSprite = new PIXI.Sprite();
    element.sprite.addChild(newSprite);

    const newSprite2 = new PIXI.Sprite();
    element.sprite.addChild(newSprite2);

    element.children[0] = { sprite: newSprite, children: [] };
    element.children[1] = { sprite: newSprite2, children: [] };
  }

  renderSierpinskiTreeFractal(
    pixiApp,
    element.children[0],
    {
      ...params,
      angle: params.angle * -1,
      depth: params.depth + 1
    },
    texture,
    colorPicker
  );
  renderSierpinskiTreeFractal(
    pixiApp,
    element.children[1],
    {
      ...params,
      depth: params.depth + 1
    },
    texture,
    colorPicker
  );
}

function endConditionFulfilled(params: SierpinskiTreeFractalParams) {
  if (params.depth > params.zoom) {
    return true;
  }
  return false;
}

export default renderSierpinskiTreeFractal;
export { sierpinskiTreeFractal };
