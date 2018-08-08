export const drawRect = (
  x: number,
  y: number,
  width: number,
  height: number,
  color: number
) => {
  const g = new PIXI.Graphics();
  g.clear();
  g.beginFill(0xffffff);
  g.drawRect(x, y, width, height);
  g.endFill();
  return g;
};
