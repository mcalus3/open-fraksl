import * as PIXI from 'pixi.js';

import { FractalElementsTree } from './index';
import { unmountChildren } from './common/sharedRenderingFunctions';
import { ColorPicker } from './common/ColorPalettes';

export type SierpinskiTreeFractalParams =
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
    }
  | { [key: string]: number };

const sierpinskiTreeFractal = {
  name: 'Sierpinski tree',
  parameters: {
    length: {
      name: 'size',
      min: 0,
      max: 1,
      default: 0.25
    },
    ratio: {
      name: 'shrinking ratio',
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
      max: 12,
      default: 5,
      step: true
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
    const params2 =
      params.depth === 1
        ? {
            ...params,
            x: params.width / 2,
            y: params.height,
            currentAngle: 0
          }
        : params;
    applyTransformation(treeElement.sprite, params2, texture, colorPicker);
    renderChildren(pixiApp, treeElement, params2, texture, colorPicker);
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
  params: SierpinskiTreeFractalParams,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (element.children.length < 2) {
    const newSprite = new PIXI.Sprite();
    pixiApp.stage.addChild(newSprite);

    const newSprite2 = new PIXI.Sprite();
    pixiApp.stage.addChild(newSprite2);

    element.children[0] = { sprite: newSprite, children: [] };
    element.children[1] = { sprite: newSprite2, children: [] };
  }

  renderSierpinskiTreeFractal(
    pixiApp,
    element.children[0],
    {
      ...params,
      currentAngle: params.currentAngle - params.angle,
      x:
        params.x +
        params.height * params.length * Math.sin(params.currentAngle),
      y:
        params.y -
        params.height * params.length * Math.cos(params.currentAngle),
      length: params.length * params.ratio,
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
      currentAngle: params.currentAngle + params.angle,
      x:
        params.x +
        params.height * params.length * Math.sin(params.currentAngle),
      y:
        params.y -
        params.height * params.length * Math.cos(params.currentAngle),
      length: params.length * params.ratio,
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
