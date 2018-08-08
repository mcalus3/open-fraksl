import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Rectangle";
export const behavior = {
  customDisplayObject: () => new PIXI.Graphics(),
  customApplyProps: (
    instance: PIXI.Container,
    {},
    newProps: {
      rect: PIXI.Graphics;
    }
  ) => instance.addChild(newProps.rect)
};
export default CustomPIXIComponent(behavior, TYPE);
