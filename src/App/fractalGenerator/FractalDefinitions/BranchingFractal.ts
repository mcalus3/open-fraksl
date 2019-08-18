import * as PIXI from 'pixi.js';

import { FractalElementsTree } from './index';
import { hideChildren } from './common/sharedRenderingFunctions';
import { ColorPicker } from './common/ColorPalettes';

export type BranchingFractalParams =
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

const branchingFractal = {
  name: 'branching fractal',
  parameters: {
    x: {
      name: 'width',
      min: 0,
      max: 50,
      default: 25
    },
    y: {
      name: 'height',
      min: 0,
      max: 50,
      default: 25
    },
    rotation: {
      name: 'rotation',
      min: 0,
      max: Math.PI,
      default: 0.1
    },
    zoom: {
      name: 'depth',
      min: 0,
      max: 18,
      default: 5,
      step: true
    }
  },
  renderingFunction: renderBranchingFractal,
  branchingFactor: 2
};

function renderBranchingFractal(
  pixiApp: PIXI.Application,
  treeElement: FractalElementsTree,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  const params = treeElement.params;
  if (endConditionFulfilled(params)) {
    hideChildren(treeElement);
  } else {
    if (params.depth === 1) {
      pixiApp.stage.addChild(treeElement.sprite);
    }
    applyTransformation(treeElement.sprite, params, texture, colorPicker);

    renderChildren(treeElement, params);
  }
}

function applyTransformation(
  sprite: PIXI.Sprite,
  params: BranchingFractalParams,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (sprite.texture !== texture) {
    sprite.texture = texture;
  }

  sprite.tint = colorPicker(params.depth);

  if (params.depth === 1) {
    sprite.anchor.set(0.5, 1);
    sprite.x = params.width / 2;
    sprite.y = params.height;
    sprite.rotation = 0;
    sprite.scale = new PIXI.Point(
      ((params.x * 2) / texture.width) * (params.width / 1600),
      ((params.y * 2) / texture.height) * (params.height / 900)
    );
  } else {
    if (params.x < 0) {
      sprite.anchor.set(1, 1);
    } else {
      sprite.anchor.set(0, 1);
    }

    sprite.x = (params.x / 2) * (params.width / 1600);
    sprite.y = -params.y * (params.height / 900);

    sprite.rotation = params.rotation;
    sprite.scale = new PIXI.Point(
      params.zoom / (params.zoom + 1),
      params.zoom / (params.zoom + 1)
    );
  }
}

function renderChildren(
  element: FractalElementsTree,
  params: BranchingFractalParams
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
        x: params.x * -1,
        rotation: params.rotation * -1,
        depth: params.depth + 1
      }
    };
    element.children[1] = {
      sprite: newSprite2,
      children: [],
      params: {
        ...params,
        depth: params.depth + 1
      }
    };
  } else {
    element.children[0].params = {
      ...params,
      x: params.x * -1,
      rotation: params.rotation * -1,
      depth: params.depth + 1
    };
    element.children[1].params = {
      ...params,
      depth: params.depth + 1
    };
  }
}

function endConditionFulfilled(params: BranchingFractalParams) {
  if (params.depth > params.zoom) {
    return true;
  }
  return false;
}

export default renderBranchingFractal;
export { branchingFractal };
