export function averageRGBMembers(rgb: string) {
  const parts = rgbaReg.exec(rgb);
  if (parts) {
    const [, , r, g, b, a1] = parts.map((m) => parseInt(m));

    const a = isNaN(a1) ? 1 : a1;
    const baseColor = (r + g + b) / 3;
    const distance = 255 - baseColor;
    return baseColor + distance * (1 - a);
  }
  return 0;
}

export function hexToRgb(hex: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `rgb(${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)})` : hex;
}

const rgbaReg = /rgb(a)?\((\d+)\,\s?(\d+)\,\s?(\d+)\,?\s?([\d\.]+)?/i; // eslint-disable-line no-useless-escape
const hexReg = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

export const isColorValue = (value: string) => rgbaReg.test(value) || hexReg.test(value);

export function componentToHex(rgbComponent: number) {
  const hex = rgbComponent.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

export function rgbToHex(rgbColor: string) {
  const parts = rgbaReg.exec(rgbColor);
  if (parts) {
    const [, , r, g, b, a] = parts;

    return (
      '#' +
      componentToHex(parseInt(r)) +
      componentToHex(parseInt(g)) +
      componentToHex(parseInt(b)) +
      (a ? componentToHex(Math.floor(parseFloat(a) * 255)) : '')
    );
  }
  return;
}
