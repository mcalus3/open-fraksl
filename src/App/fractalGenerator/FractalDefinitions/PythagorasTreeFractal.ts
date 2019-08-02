import * as PIXI from 'pixi.js';

import { FractalElementsTree } from './index';
import { unmountChildren } from './common/sharedRenderingFunctions';
import { ColorPicker } from './common/ColorPalettes';

export type PythagorasTreeFractalParams =
  | {
      length: number;
      ratio: number;
      angle: number;
      currentAngle: number;
      zoom: number;
      width: number;
      height: number;
      depth: number;
      x: number;
      y: number;
      anchor: number;
    }
  | { [key: string]: number };

const pythagorasTreeFractal = {
  name: 'Pythagoras tree',
  parameters: {
    length: {
      name: 'size',
      min: 0,
      max: 1,
      default: 0.25
    },
    angle: {
      name: 'angle',
      min: 0,
      max: Math.PI / 2,
      default: Math.PI / 4
    },
    zoom: {
      name: 'depth',
      min: 0,
      max: 12,
      default: 5,
      step: true
    }
  },
  renderingFunction: renderPythagorasTreeFractal
};

function renderPythagorasTreeFractal(
  pixiApp: PIXI.Application,
  treeElement: FractalElementsTree,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  const params = treeElement.params;
  if (endConditionFulfilled(params)) {
    unmountChildren(treeElement);
  } else {
    const params2 =
      params.depth === 1
        ? {
            ...params,
            x: params.width / 2 - (params.height * params.length) / 2,
            y: params.height,
            currentAngle: 0,
            anchor: 0
          }
        : params;
    applyTransformation(treeElement.sprite, params2, texture, colorPicker);
    renderChildren(pixiApp, treeElement, params2, texture, colorPicker);
  }
}

function applyTransformation(
  sprite: PIXI.Sprite,
  params: PythagorasTreeFractalParams,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (sprite.texture !== texture) {
    sprite.texture = texture;
  }

  sprite.tint = colorPicker(params.depth);

  sprite.anchor.set(params.anchor, 1);
  sprite.rotation = params.currentAngle;
  sprite.x = params.x;
  sprite.y = params.y;

  if (texture.width * ((params.height * params.length) / texture.height) < 1) {
    sprite.scale.set(1, (params.height * params.length) / texture.height);
  } else {
    sprite.scale.set((params.height * params.length) / texture.height);
  }
}

function renderChildren(
  pixiApp: PIXI.Application,
  element: FractalElementsTree,
  params: PythagorasTreeFractalParams,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (element.children.length < 2) {
    const newSprite = new PIXI.Sprite();
    pixiApp.stage.addChild(newSprite);

    const newSprite2 = new PIXI.Sprite();
    pixiApp.stage.addChild(newSprite2);

    const { x1, y1, x2, y2 } = calculateNewCoords(params, element.sprite.width);

    element.children[0] = {
      sprite: newSprite,
      children: [],
      params: {
        ...params,
        currentAngle: params.currentAngle - params.angle,
        x: x1,
        y: y1,
        length: params.length * Math.cos(params.angle),
        depth: params.depth + 1,
        anchor: 0
      }
    };
    element.children[1] = {
      sprite: newSprite2,
      children: [],
      params: {
        ...params,
        currentAngle: params.currentAngle + Math.PI / 2 - params.angle,
        x: x2,
        y: y2,
        length: params.length * Math.sin(params.angle),
        depth: params.depth + 1,
        anchor: 1
      }
    };
  }
}

function endConditionFulfilled(params: PythagorasTreeFractalParams) {
  if (params.depth > params.zoom) {
    return true;
  }
  return false;
}

function calculateNewCoords(
  params: PythagorasTreeFractalParams,
  width: number
) {
  if (params.anchor === 0) {
    const x1 =
      params.x + params.height * params.length * Math.sin(params.currentAngle);
    const y1 =
      params.y - params.height * params.length * Math.cos(params.currentAngle);
    const x2 =
      params.x +
      width * Math.cos(params.currentAngle) +
      params.height * params.length * Math.sin(params.currentAngle);
    const y2 =
      params.y +
      width * Math.sin(params.currentAngle) +
      -params.height * params.length * Math.cos(params.currentAngle);
    return { x1, y1, x2, y2 };
  } else {
    const x1 =
      params.x -
      width * Math.cos(params.currentAngle) +
      params.height * params.length * Math.sin(params.currentAngle);
    const y1 =
      params.y -
      width * Math.sin(params.currentAngle) -
      params.height * params.length * Math.cos(params.currentAngle);
    const x2 =
      params.x + params.height * params.length * Math.sin(params.currentAngle);
    const y2 =
      params.y - params.height * params.length * Math.cos(params.currentAngle);
    return { x1, y1, x2, y2 };
  }
}

export default renderPythagorasTreeFractal;
export { pythagorasTreeFractal };
