import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Rectangle";
export const behavior = {
  customDisplayObject: () => new PIXI.Graphics(),
  customApplyProps: (
    instance: PIXI.Graphics,
    {},
    newProps: {
      fill: number;
      x: number;
      y: number;
      width: number;
      height: number;
    }
  ) => {
    const { fill, x, y, width, height } = newProps;
    instance.clear();
    instance.beginFill(fill);
    instance.drawStar(x, y, 3, Math.min(width, height), 0);
    instance.endFill();
  }
};
export default CustomPIXIComponent(behavior, TYPE);
