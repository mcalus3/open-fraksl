export type ColorDefinition = {
  name: string;
  pick: ColorPicker;
};

export type ColorPicker = (order: number) => number;

const blackAndWhite: ColorPicker = (order: number) => {
  return order % 2 === 0 ? 0 : 0xffffff;
};

const calusPalette: ColorPicker = (order: number) => {
  return 0xffffff / (order + 1);
};

const gumballPalette: ColorPicker = (order: number) => {
  const colors = [
    0xe6194b,
    0x3cb44b,
    0xffe119,
    0x4363d8,
    0xf58231,
    0x911eb4,
    0x42d4f4,
    0xf032e6,
    0xbfef45,
  ];
  return colors[order % colors.length];
};

const rainbowPalette: ColorPicker = (order: number) => {
  const colors = [
    0xff0000,
    0xffa500,
    0xffff00,
    0x008000,
    0x0000ff,
    0x4b0082,
    0xee82ee,
  ];
  return colors[order % colors.length];
};

const None: ColorPicker = (order: number) => {
  return 0xffffff;
};

export const colorPalettes: ColorDefinition[] = [
  { name: "sea colors", pick: calusPalette },
  { name: "black and white", pick: blackAndWhite },
  { name: "gumball", pick: gumballPalette },
  { name: "rainbow", pick: rainbowPalette },
  { name: "none", pick: None },
];
