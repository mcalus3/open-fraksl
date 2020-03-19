import { FractalTexture } from "../FractalDefinitions/common/FractalTextures";
import { ColorDefinition } from "../FractalDefinitions/common/ColorPalettes";

export type FractalLoadData = {
  color: ColorDefinition;
  parameters: Record<string, number>;
  name: string;
  texture: FractalTexture;
};

export const loadFractal = () => {};

export const uploadFractal = (data: FractalLoadData) => {
  console.log("uploading fractal data...", data);
};
