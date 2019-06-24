import { Params, FractalElementsTree } from '../FractalModels';

export function endConditionFulfilled(params: Params): boolean {
  const totalZoom = Math.pow(params.zoom, params.depth);
  return (
    Math.min(params.height * totalZoom, params.width * totalZoom) < 1 ||
    params.depth > 5000
  );
}

export function unmountChildren(treeElement: FractalElementsTree) {
  treeElement.children.forEach(child => {
    unmountChildren(child);
    if (child.element.parent) {
      child.element.parent.removeChild(child.element);
    }
  });
  treeElement.children = [];
}