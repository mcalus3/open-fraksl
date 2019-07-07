import * as PIXI from 'pixi.js';

export type FractalTexture = {
  name: string;
  texture: PIXI.Texture;
};

export const fullRectangle: FractalTexture = {
  name: 'full rectangle',
  texture: PIXI.Texture.WHITE
};

export const ellipsis: FractalTexture = {
  name: 'ellipsis',
  texture: getEllipsisTexture()
};

export const rectangle: FractalTexture = {
  name: 'rectangle',
  texture: getRectangleTexture()
};

export const fullEllipsis: FractalTexture = {
  name: 'full ellipsis',
  texture: getFullEllipsisTexture()
};

export const fractalTextures: FractalTexture[] = [
  fullRectangle,
  ellipsis,
  fullEllipsis,
  rectangle
];

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

function getFullEllipsisTexture() {
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
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  return PIXI.Texture.from(canvas);
}

function getRectangleTexture() {
  const quality = 500;
  const canvas = document.createElement('canvas');
  canvas.width = quality;
  canvas.height = quality;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.beginPath();
  ctx.rect(0, 0, quality, quality);
  ctx.lineWidth = (10 * quality) / 1000;
  ctx.strokeStyle = '#FFFFFF';
  ctx.stroke();

  return PIXI.Texture.from(canvas);
}
