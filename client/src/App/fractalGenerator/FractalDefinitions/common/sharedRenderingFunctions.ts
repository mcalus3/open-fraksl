import { FractalElementsTree, ParametersType } from "../index";
import { RenderFunctionParams } from "./fractalRendererBuilder";
import * as PIXI from "pixi.js";

export function hideChildren(treeElement: FractalElementsTree) {
  for (let i = 0; i < treeElement.children.length; i++) {
    hideChildren(treeElement.children[i]);
    treeElement.children[i].sprite.renderable = false;
  }
  treeElement.children = [];
  treeElement.sprite.renderable = false;
}

export function depthExceedsZoomLevel(params: RenderFunctionParams) {
  if (params.treeElement.params.depth > params.treeElement.params.zoom) {
    return true;
  }
  return false;
}

export type TransformationParams = {
  anchor: PIXI.Point;
  scale: PIXI.Point;
  rotation: number;
  x: number;
  y: number;
};

export function applySpriteAttributes(
  sprite: PIXI.Sprite,
  texture: PIXI.Texture,
  tint: number,
  params: TransformationParams
) {
  sprite.texture = texture;
  sprite.tint = tint;
  sprite.x = params.x;
  sprite.y = params.y;
  sprite.scale = params.scale;
  sprite.anchor = params.anchor;
  sprite.rotation = params.rotation;
}

export function renderChildren(
  params: RenderFunctionParams,
  childrenVariables: ParametersType[]
) {
  const pp = params.treeElement.params;

  for (let i = 0; i < childrenVariables.length; i++) {
    if (!params.treeElement.children[i]) {
      const newSprite = new PIXI.Sprite();
      params.pixiApp.stage.addChild(newSprite);
      params.treeElement.children[i] = {
        sprite: newSprite,
        children: [],
        params: { ...pp, ...childrenVariables[i] }
      };
    } else {
      params.treeElement.children[i].params = {
        ...pp,
        ...childrenVariables[i]
      };
    }
  }
}
