import * as PIXI from 'pixi.js';

import { FractalElementsTree, FractalDefinition } from './index';
import { unmountChildren } from './common/sharedRenderingFunctions';
import { ColorPicker } from './common/ColorPalettes';

export const branchingFractal: FractalDefinition = {
  name: 'branching fractal',
  parameters: {
    x: {
      name: 'x',
      min: 0,
      max: 100,
      default: 10
    },
    y: {
      name: 'y',
      min: 0,
      max: 100,
      default: 10
    },
    rotation: {
      name: 'rotation',
      min: 0,
      max: Math.PI,
      default: 0.1
    },
    zoom: {
      name: 'zoom',
      min: 0,
      max: 13,
      default: 5
    }
  },
  renderingFunction: renderBranchingFractal
};

type Params = {
  x: number;
  y: number;
  rotation: number;
  zoom: number;
  width: number;
  height: number;
  depth: number;
  prevX: number;
  prevY: number;
};

export default function renderBranchingFractal(
  pixiApp: PIXI.Application,
  treeElement: FractalElementsTree,
  params: Params,
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
  params: Params,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (sprite.texture !== texture) {
    sprite.texture = texture;
  }

  sprite.tint = colorPicker(params.depth);

  if (params.depth === 1) {
    sprite.anchor.set(0.5);
    sprite.x = params.width / 2;
    sprite.y = params.height - (20 * params.y) / 2;
    sprite.scale = new PIXI.Point(
      (5 * params.x) / texture.width,
      (20 * params.y) / texture.height
    );
  } else {
    if (params.x < 0) {
      sprite.anchor.set(1, 1);
    } else {
      sprite.anchor.set(0, 1);
    }

    // sprite.x = (5 * params.x) / 2;
    // sprite.y = -(20 * params.y) / 2;
    sprite.x = params.x / 2;
    sprite.y = -10;

    sprite.rotation = params.rotation;
    sprite.scale = new PIXI.Point(
      params.zoom / (params.zoom + 1),
      params.zoom / (params.zoom + 1)
    );
  }
}

function renderChildren(
  pixiApp: PIXI.Application,
  element: FractalElementsTree,
  params: Params,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (element.children.length < 2) {
    const newSprite = new PIXI.Sprite(texture);
    newSprite.x = params.width;
    newSprite.y = params.height;
    element.sprite.addChild(newSprite);

    const newSprite2 = new PIXI.Sprite(texture);
    newSprite2.x = params.width;
    newSprite2.y = params.height;
    element.sprite.addChild(newSprite2);

    element.children[0] = { sprite: newSprite, children: [] };
    element.children[1] = { sprite: newSprite2, children: [] };
  }

  renderBranchingFractal(
    pixiApp,
    element.children[0],
    {
      ...params,
      x: params.x * -1,
      rotation: params.rotation * -1,
      depth: params.depth + 1
    },
    texture,
    colorPicker
  );
  renderBranchingFractal(
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

function endConditionFulfilled(params: Params) {
  if (params.depth > params.zoom) {
    return true;
  }
  return false;
}
