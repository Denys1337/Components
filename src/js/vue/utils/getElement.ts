import { Ref, isRef } from 'vue';

import { ElementReference } from '../tooltip/types';

export type ElemVueString = HTMLElement | ElementReference | string;

export function getElements(...elems: (ElemVueString | null | undefined)[]) {
  return elems.map((elem) => getElement(elem));
}

export function getElement(elem: ElemVueString | null | undefined): HTMLElement | null {
  if (isRef(elem)) {
    elem = (elem as Ref).value;
  }

  type ElementRef = { elemRef: HTMLElement };

  if (elem && (elem as unknown as ElementRef).elemRef) {
    // @ts-ignore next-line
    return (elem as unknown as ElementRef).elemRef;
  }

  if (!elem) {
    return null;
  }

  if (typeof elem === 'string') {
    return document.querySelector(elem) as unknown as HTMLElement;
  }

  return elem as HTMLElement;
}

export function getWidth(elem: ElemVueString) {
  return (getElements(elem) as unknown as HTMLElement)?.getBoundingClientRect().width;
}
