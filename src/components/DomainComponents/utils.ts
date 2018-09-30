export const drawRect = (
  x: number,
  y: number,
  width: number,
  height: number,
  color: number,
  alpha: number = 0
) => {
  const g = new PIXI.Graphics();
  g.clear();
  g.alpha = alpha;
  g.beginFill(color);
  g.drawRect(x, y, width, height);
  g.endFill();
  return g;
};
