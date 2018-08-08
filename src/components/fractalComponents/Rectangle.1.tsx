import * as PIXI from "pixi.js";

const Rect = (
  fill: number,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const rect = new PIXI.Graphics();
  rect.clear();
  rect.beginFill(fill);
  rect.drawRect(x, y, width, height);
  rect.endFill();
  return rect;
};

export default Rect;
