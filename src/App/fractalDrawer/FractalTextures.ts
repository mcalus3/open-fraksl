import * as PIXI from 'pixi.js';

export type FractalTexture = {
  name: string;
  texture: PIXI.Texture;
};

export const rectangle: FractalTexture = {
  name: 'rectangle',
  texture: PIXI.Texture.WHITE
};

export const fractalTextures: FractalTexture[] = [rectangle];
