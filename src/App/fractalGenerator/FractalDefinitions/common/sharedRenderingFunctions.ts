import { Params, FractalElementsTree } from '../index';

export function smallerThanOnePixel(params: Params): boolean {
  const totalZoom = Math.pow(params.zoom, params.depth);
  return (
    Math.min(params.height * totalZoom, params.width * totalZoom) < 1 ||
    params.depth > 5000
  );
}

export function unmountChildren(treeElement: FractalElementsTree) {
  for (let i = 0; i < treeElement.children.length; i++) {
    unmountChildren(treeElement.children[i]);
    if (treeElement.children[i].sprite.parent) {
      treeElement.children[i].sprite.parent.removeChild(
        treeElement.children[i].sprite
      );
    }
  }
  treeElement.children = [];
}
