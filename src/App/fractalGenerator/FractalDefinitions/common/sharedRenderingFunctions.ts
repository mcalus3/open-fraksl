import { FractalElementsTree } from '../index';

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
