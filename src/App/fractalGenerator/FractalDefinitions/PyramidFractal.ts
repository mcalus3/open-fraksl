import * as PIXI from 'pixi.js';

import { FractalElementsTree } from './index';
import { unmountChildren } from './common/sharedRenderingFunctions';
import { ColorPicker } from './common/ColorPalettes';

export type PyramidFractalParams =
  | {
      x: number;
      y: number;
      rotation: number;
      zoom: number;
      width: number;
      height: number;
      depth: number;
    }
  | { [key: string]: number };

const PyramidFractal = {
  name: 'pyramid fractal',
  parameters: {
    rotation: {
      name: 'rotation',
      min: 0,
      max: Math.PI,
      default: 0.2
    },
    zoom: {
      name: 'depth',
      min: 0,
      max: 100,
      default: 70
    }
  },
  renderingFunction: renderPyramidFractal
};

function renderPyramidFractal(
  pixiApp: PIXI.Application,
  treeElement: FractalElementsTree,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  const params = treeElement.params;
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
  params: PyramidFractalParams,
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

  sprite.rotation = params.rotation;
  sprite.scale = new PIXI.Point(
    params.width / texture.width,
    params.height / texture.height
  );
}

function renderChildren(
  pixiApp: PIXI.Application,
  element: FractalElementsTree,
  params: PyramidFractalParams,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (element.children.length === 0) {
    const newSprite = new PIXI.Sprite();

    pixiApp.stage.addChild(newSprite);
    element.children[0] = {
      sprite: newSprite,
      children: [],
      params: {
        ...params,
        width: (params.width * params.zoom) / (params.zoom + 1),
        height: (params.height * params.zoom) / (params.zoom + 1),
        depth: params.depth + 1
      }
    };
  }
}

function endConditionFilfulled(params: PyramidFractalParams) {
  return Math.min(params.height, params.width) < 1 || params.depth > 5000;
}

export default renderPyramidFractal;
export { PyramidFractal };
