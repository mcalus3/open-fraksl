import { Params, FractalElementsTree } from '../FractalModels';

export function endConditionFulfilled(params: Params): boolean {
  const zoom = Math.pow(params.zoom, params.depth);
  return (
    Math.min(params.height * zoom, params.width * zoom) < 1 ||
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
