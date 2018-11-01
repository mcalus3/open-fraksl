type NOT_INITIALISED = 'not_initialised';

type FractalElementsTree = {
  element: PIXI.Sprite | NOT_INITIALISED;
  children: FractalElementsTree[];
};

const rootFractalElement: FractalElementsTree = {
  element: 'not_initialised',
  children: []
};

export function applyContextAndRenderFractal(
  pa: PIXI.Application,
  p: { [key: string]: number }
) {
  const pixiApp = pa;

  const params = {
    w: p['width'],
    h: p['height'],
    r: p['rot'],
    z: p['zoom'] / (p['zoom'] + 1),
    dx: p['x'] * p['width'],
    dy: p['y'] * p['height']
  };

  renderFractalIterative(rootFractalElement, 1);

  function renderFractalIterative(
    treeElement: FractalElementsTree,
    depth: number
  ) {
    if (!endConditionFulfilled(depth)) {
      initializeSpriteIfNecessary(treeElement);

      applyTransformation(treeElement.element as PIXI.Sprite, depth);

      renderChildren(treeElement.children, depth);
    }
  }

  function endConditionFulfilled(depth: number): boolean {
    const zoom = Math.pow(params.z, depth);
    return Math.min(params.h * zoom, params.w * zoom) < 3 || depth > 500;
  }

  function initializeSpriteIfNecessary(treeElement: FractalElementsTree) {
    if (treeElement.element === 'not_initialised') {
      treeElement.element = new PIXI.Sprite(PIXI.Texture.WHITE);
      pixiApp.stage.addChild(treeElement.element);
    }
  }

  function applyTransformation(sprite: PIXI.Sprite, depth: number) {
    const zoom = Math.pow(params.z, depth);

    sprite.tint = 0xffffff / depth;

    sprite.anchor.set(0.5);
    sprite.x = params.w / 2 + params.dx * depth;
    sprite.y = params.h / 2 + params.dy * depth;

    sprite.rotation = params.r * depth;
    sprite.scale = new PIXI.Point(
      (params.w * zoom) / 10,
      (params.h * zoom) / 10
    );
  }

  function renderChildren(elements: FractalElementsTree[], depth: number) {
    if (elements.length === 0) {
      elements[0] = { element: 'not_initialised', children: [] };
    }

    renderFractalIterative(elements[0], depth + 1);
  }
}
