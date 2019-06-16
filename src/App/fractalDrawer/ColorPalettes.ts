export type ColorDefinition = {
  name: string;
  pick: ColorPicker;
};

export type ColorPicker = (order: number) => number;

const blackAndWhite: ColorPicker = (order: number) => {
  return order % 2 === 0 ? 0 : 0xffffff;
};

const calusPalette: ColorPicker = (order: number) => {
  return 0xffffff / order;
};

const None: ColorPicker = (order: number) => {
  return 0xffffff;
};

export const colorPalettes: ColorDefinition[] = [
  { name: 'calus palette', pick: calusPalette },
  { name: 'black and white', pick: blackAndWhite },
  { name: 'none', pick: None }
];
