import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Mask";
export const behavior = {
  customDisplayObject: () => new PIXI.Container(),
  customApplyProps: (
    instance: PIXI.Graphics,
    {},
    newProps: { draw: PIXI.Graphics }
  ) => {
    instance.mask = newProps.draw;
    return instance;
  }
};
export const Mask = CustomPIXIComponent(behavior, TYPE);
