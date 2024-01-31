export type CSSDeclarationKey = keyof CSSStyleDeclaration;

export interface Item {
  key: string;
  style: Record<string, string>;
  cls: string[];
}

export function getDefinedCSS(
  target: HTMLElement | CSSStyleDeclaration,
  cssOps: CSSDeclarationKey[]
): [string, string][] {
  const style = target instanceof HTMLElement ? getComputedStyle(target) : target;

  const setCSSDeclarations = cssOps.filter((key) => {
    const val: string | null = style[key] as unknown as string | null;
    return val && val.length && val !== '0px';
  });

  return setCSSDeclarations.map((dec) => [dec.toString(), style[dec]!.toString()]);
}

const numericValueReg = /(\d+)(px|rem|em)/i;
type getNumericValueResult = [number, string];
export function getNumericValue(cssValue: string): getNumericValueResult {
  const results = numericValueReg.exec(cssValue);
  if (results) {
    return [parseFloat(results[1]), results[2]];
  }
  return [0, ''];
}

export const generateClassTexts = (classList: string[]) =>
  classList.map((className) => ({
    text: className.replace(/-/g, ' '),
    deprecated: false,
    className,
  }));
