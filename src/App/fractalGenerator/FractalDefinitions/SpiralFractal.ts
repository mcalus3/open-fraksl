import { FractalElementsTree, FractalDefinition } from './index';
import {
  smallerThanOnePixel,
  unmountChildren
} from './common/sharedRenderingFunctions';
import * as PIXI from 'pixi.js';
import { ColorPicker } from './common/ColorPalettes';

type Params = {
  x: number;
  y: number;
  rotation: number;
  zoom: number;
  width: number;
  height: number;
  depth: number;
};

export const spiralFractal: FractalDefinition = {
  name: 'spiral fractal',
  parameters: {
    x: {
      name: 'x',
      min: -1,
      max: 1,
      default: 0
    },
    y: {
      name: 'y',
      min: -1,
      max: 1,
      default: 0
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
      max: 100,
      default: 1
    }
  },
  renderingFunction: renderSpiralFractal
};

export default function renderSpiralFractal(
  pixiApp: PIXI.Application,
  treeElement: FractalElementsTree,
  params: Params,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (smallerThanOnePixel(params)) {
    unmountChildren(treeElement);
  } else {
    applyTransformation(treeElement.sprite, params, texture, colorPicker);

    renderChildren(pixiApp, treeElement.children, params, texture, colorPicker);
  }
}

function applyTransformation(
  sprite: PIXI.Sprite,
  params: Params,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  const zoom = Math.pow(params.zoom / (params.zoom + 1), params.depth);

  sprite.tint = colorPicker(params.depth);
  if (sprite.texture !== texture) {
    sprite.texture = texture;
  }

  sprite.anchor.set(0.5);
  sprite.x = params.width / 2 + params.x * params.depth;
  sprite.y = params.height / 2 + params.y * params.depth;

  sprite.rotation = params.rotation * params.depth;
  sprite.scale = new PIXI.Point(
    (params.width * zoom) / texture.width,
    (params.height * zoom) / texture.height
  );
}

function renderChildren(
  pixiApp: PIXI.Application,
  elements: FractalElementsTree[],
  params: Params,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (elements.length === 0) {
    const newSprite = new PIXI.Sprite(texture);
    newSprite.x = params.width;
    newSprite.y = params.height;

    pixiApp.stage.addChild(newSprite);
    elements[0] = { sprite: newSprite, children: [] };
  }

  renderSpiralFractal(
    pixiApp,
    elements[0],
    {
      ...params,
      depth: params.depth + 1
    },
    texture,
    colorPicker
  );
}
