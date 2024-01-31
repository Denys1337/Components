export enum ColorsProperties {
  Color = 'color',
  BackgroundColor = 'background-color',
  Background = 'background',
  BorderColor = 'border-color',
}

export enum DurationProperties {
  AnimationDuration = 'animation-duration',
  AnimationDelay = 'animation-delay',
}

export enum SizedProperties {
  FontSize = 'font-size',
  Width = 'width',
  Height = 'height',
  BorderWidth = 'border-width',
  LineHeight = 'line-height',
  Padding = 'padding',
  Margin = 'margin',
  Gap = 'gap',
}

export enum IntProperties {
  FontWeight = 'font-weight',
}

export function getPossiblePropertyTypes(calculatedValue: string) {
  const uniqueOptions = new Set<string>();
  if (isColor(calculatedValue)) {
    Object.values(ColorsProperties).forEach((val) => uniqueOptions.add(val));
  }
  if (isDuration(calculatedValue)) {
    Object.values(DurationProperties).forEach((val) => uniqueOptions.add(val));
  }
  if (isSizeUnit(calculatedValue)) {
    Object.values(SizedProperties).forEach((val) => uniqueOptions.add(val));
  }
  if (isInt(calculatedValue)) {
    Object.values(IntProperties).forEach((val) => uniqueOptions.add(val));
  }
  return Array.from(uniqueOptions);
}

const isColor = (str: string) => str.startsWith('rgb') || /^#[a-f0-9]{3,6}$/i.test(str);

const isDuration = (str: string) => /^\d+(\.\d+)?(m?s)$/i.test(str);

const sizeUnits = [
  'cm',
  'mm',
  'in',
  'px',
  'pt',
  'pc',
  'em',
  'ex',
  'ch',
  'rem',
  'vw',
  'vh',
  'vmin',
  'vmax',
  '%',
];
const sizeUnitsRegExp = new RegExp(`\d+(\.\d+)?${sizeUnits.join('|')}`); // eslint-disable-line no-useless-escape
const isSizeUnit = (str: string) => sizeUnitsRegExp.test(str);

const intRegExp = /\d+/;
const isInt = (str: string) => intRegExp.test(str);
