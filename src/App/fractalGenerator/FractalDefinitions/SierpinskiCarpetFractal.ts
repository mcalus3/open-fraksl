import * as PIXI from 'pixi.js';

import { FractalElementsTree } from './index';
import { unmountChildren } from './common/sharedRenderingFunctions';
import { ColorPicker } from './common/ColorPalettes';

type Left = -1;
type Right = 1;
type Side = Left | Right;

export type SierpinskiCarpetFractalParams =
  | {
      x: number;
      y: number;
      zoom: number;
      rotation: number;
      width: number;
      height: number;
      depth: number;
    }
  | { [key: string]: number };

const sierpinskiCarpetFractal = {
  name: "Sierpinski's carpet",
  parameters: {
    zoom: {
      name: 'depth',
      min: 0,
      max: 6,
      default: 3,
      step: true
    },
    rotation: {
      name: 'rotation',
      min: 0,
      max: Math.PI,
      default: Math.PI / 2
    }
  },
  renderingFunction: renderSierpinskiCarpetFractal
};

function renderSierpinskiCarpetFractal(
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
  params: SierpinskiCarpetFractalParams,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (sprite.texture !== texture) {
    sprite.texture = texture;
  }

  sprite.tint = colorPicker(params.depth);

  if (params.depth === 1) {
    const size = Math.min(params.width, params.height);
    sprite.anchor.set(0.5, 0.5);
    sprite.x = params.width / 2;
    sprite.y = params.height / 2;
    sprite.rotation = params.rotation;
    sprite.width = size / 3;
    sprite.height = size / 3;
  } else {
    sprite.anchor.set(0.5, 0.5);
    sprite.rotation = params.rotation;
    sprite.x = texture.width * params.x;
    sprite.y = texture.height * params.y;
    sprite.scale = new PIXI.Point(1 / 3, 1 / 3);
  }
}

function renderChildren(
  pixiApp: PIXI.Application,
  element: FractalElementsTree,
  params: SierpinskiCarpetFractalParams,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (element.children.length < 2) {
    for (let i = 0; i < 8; i++) {
      const newSprite = new PIXI.Sprite();
      element.sprite.addChild(newSprite);

      element.children[i] = { sprite: newSprite, children: [], params: {}};
    }
  }

    element.children[0].params = {

      x: -1,
      y: -1,
      depth: params.depth + 1
    }

    element.children[1].params = {
      x: 0,
      y: -1,
      depth: params.depth + 1
    }

    element.children[2].params = {
      x: 1,
      y: -1,
      depth: params.depth + 1
    }

    element.children[3].params = {
      x: -1,
      y: 0,
      depth: params.depth + 1
    }

    element.children[4].params = {
      x: 1,
      y: 0,
      depth: params.depth + 1
    }

    element.children[5].params = {
      x: -1,
      y: 1,
      depth: params.depth + 1
    }

    element.children[6].params = {
      x: 0,
      y: 1,
      depth: params.depth + 1
    }

    element.children[7].params = {
      x: 1,
      y: 1,
      depth: params.depth + 1
    }
}

function endConditionFulfilled(params: SierpinskiCarpetFractalParams) {
  if (params.depth > params.zoom) {
    return true;
  }
  return false;
}

export default renderSierpinskiCarpetFractal;
export { sierpinskiCarpetFractal };
