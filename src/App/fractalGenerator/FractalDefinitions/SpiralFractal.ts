import { FractalElementsTree } from './index';
import { hideChildren } from './common/sharedRenderingFunctions';
import * as PIXI from 'pixi.js';
import { ColorPicker } from './common/ColorPalettes';
import { RenderFunctionParams } from './common/fractalRendererBuilder';

export type SpiralFractalParams =
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

const spiralFractal = {
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
      name: 'depth',
      min: 0,
      max: 200,
      default: 30
    }
  },
  renderingFunction: renderSpiralFractal,
  branchingFactor: 0
};

function renderSpiralFractal({
  pixiApp,
  treeElement,
  texture,
  colorPicker
}: RenderFunctionParams) {
  const params = treeElement.params;
  if (
    CalculateZoomForElement(params) * params.width < 1 ||
    params.depth > 5000
  ) {
    hideChildren(treeElement);
  } else {
    applyTransformation(treeElement.sprite, params, texture, colorPicker);

    renderChildren(pixiApp, treeElement.children, params, texture, colorPicker);
  }
}

function applyTransformation(
  sprite: PIXI.Sprite,
  params: SpiralFractalParams,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  const zoom = CalculateZoomForElement(params);

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

function CalculateZoomForElement(params: SpiralFractalParams) {
  return Math.pow(params.zoom / (params.zoom + 1), params.depth);
}

function renderChildren(
  pixiApp: PIXI.Application,
  elements: FractalElementsTree[],
  params: SpiralFractalParams,
  texture: PIXI.Texture,
  colorPicker: ColorPicker
) {
  if (elements.length === 0) {
    const newSprite = new PIXI.Sprite();

    pixiApp.stage.addChild(newSprite);
    elements[0] = {
      sprite: newSprite,
      children: [],
      params: {
        ...params,
        depth: params.depth + 1
      }
    };
  }
  elements[0].params = {
    ...params,
    depth: params.depth + 1
  };
}

export default renderSpiralFractal;
export { spiralFractal };
