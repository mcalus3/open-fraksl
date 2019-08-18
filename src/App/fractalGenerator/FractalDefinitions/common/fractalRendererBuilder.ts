import { FractalElementsTree, ParametersType } from "..";
import { ColorPicker } from "./ColorPalettes";
import {
  hideChildren,
  TransformationParams,
  applySpriteAttributes,
  renderChildren
} from "./sharedRenderingFunctions";

export function buildRenderFunction(
  fractalFunctionDefinitions: FractalFunctionDefinitions
) {
  return (params: RenderFunctionParams) => {
    if (fractalFunctionDefinitions.isLastElement(params)) {
      hideChildren(params.treeElement);
    } else {
      if (
        params.treeElement.params.depth === 1 &&
        !params.treeElement.sprite.parent
      ) {
        params.pixiApp.stage.addChild(params.treeElement.sprite);
      }
      if (!params.treeElement.sprite.renderable) {
        params.treeElement.sprite.renderable = true;
      }

      applySpriteAttributes(
        params.treeElement.sprite,
        params.texture,
        params.colorPicker(params.treeElement.params.depth),
        fractalFunctionDefinitions.prepareTransformationAttributes(params)
      );
      renderChildren(
        params,
        fractalFunctionDefinitions.applyPropsToChildren(params)
      );
    }
  };
}

export type FractalFunctionDefinitions = {
  isLastElement: (params: RenderFunctionParams) => boolean;
  prepareTransformationAttributes: (
    params: RenderFunctionParams
  ) => TransformationParams;
  applyPropsToChildren: (params: RenderFunctionParams) => ParametersType[];
};

export type RenderFunctionParams = {
  pixiApp: PIXI.Application;
  treeElement: FractalElementsTree;
  texture: PIXI.Texture;
  colorPicker: ColorPicker;
};

export default buildRenderFunction;
