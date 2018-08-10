import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Rectangle";
export const behavior = {
  customDisplayObject: () => new PIXI.Graphics(),
  customApplyProps: (
    instance: PIXI.Graphics,
    {},
    newProps: {
      g: PIXI.Graphics;
    }
  ) => {
    const { g } = newProps;
    instance = g;
  }
};
export default CustomPIXIComponent(behavior, TYPE);
