import * as PIXI from 'pixi.js';

export type FractalTexture = {
  name: string;
  texture: PIXI.Texture;
};

export const rectangle: FractalTexture = {
  name: 'rectangle',
  texture: PIXI.Texture.WHITE
};

export const ellipsis: FractalTexture = {
  name: 'ellipsis',
  texture: getEllipsisTexture()
};

export const fractalTextures: FractalTexture[] = [rectangle, ellipsis];

function getEllipsisTexture() {
  const quality = 500;
  const canvas = document.createElement('canvas');
  canvas.width = quality;
  canvas.height = quality;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.beginPath();
  ctx.arc(quality / 2, quality / 2, quality / 2.01, 0, 2 * Math.PI, false);
  ctx.lineWidth = (5 * quality) / 1000;
  ctx.strokeStyle = '#FFFFFF';
  ctx.stroke();

  return PIXI.Texture.from(canvas);
}
