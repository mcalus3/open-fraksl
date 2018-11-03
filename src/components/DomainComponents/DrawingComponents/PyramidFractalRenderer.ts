import { FractalElementsTree } from 'src/stateManagement/FractalModels';
import { endConditionFulfilled, unmountChildren } from './utils';

type Params = {
  x: number;
  y: number;
  rot: number;
  zoom: number;
  width: number;
  height: number;
  depth: number;
};

export default function renderPyramidFractal(
  pixiApp: PIXI.Application,
  treeElement: FractalElementsTree,
  params: Params
) {
  if (endConditionFulfilled(params)) {
    unmountChildren(treeElement);
  } else {
    applyTransformation(treeElement.element as PIXI.Sprite, params);

    renderChildren(pixiApp, treeElement.children, params);
  }
}

function applyTransformation(sprite: PIXI.Sprite, params: Params) {
  const zoom = Math.pow(params.zoom, params.depth);

  sprite.tint = 0xffffff / params.depth;

  sprite.anchor.set(0.5);
  sprite.x = params.width / 2 + params.x * params.depth;
  sprite.y = params.height / 2 + params.y * params.depth;

  sprite.rotation = params.rot * params.depth;
  sprite.scale = new PIXI.Point(
    (params.width * zoom) / 10,
    (params.height * zoom) / 10
  );
}

function renderChildren(
  pixiApp: PIXI.Application,
  elements: FractalElementsTree[],
  params: Params
) {
  if (elements.length === 0) {
    const newSprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    pixiApp.stage.addChild(newSprite);
    elements[0] = { element: newSprite, children: [] };
  }

  renderPyramidFractal(pixiApp, elements[0], {
    ...params,
    depth: params.depth + 1
  });
}
