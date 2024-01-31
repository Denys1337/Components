import { nextTick } from 'vue';

import {
  Position,
  Align,
  findScreenPositionWithoutBleedingOut,
} from '@agritask/js-utils/libs/aligning_utils';

import { ElemVueString, getElement, getElements } from './getElement';
import { AppendConfig } from './portalOnCommandTypes';

const DEFAULT_POSITION: Position = 'top';
const DEFAULT_ALIGN: Align = 'center';

function elementsAreDisplayed(elem1: HTMLElement, elem2: HTMLElement) {
  return elem1.offsetParent && elem2.offsetParent;
}

export default function portalOnCommand(
  portalTo: HTMLElement | string = document.body,
  alignWith: ElemVueString | DOMRect | undefined,
  config: AppendConfig = {}
) {
  config = { updateOnScreenChange: true, attachToFullscreenRoot: true, ...config };

  let elem: ElemVueString | undefined;

  let screenChangeTimeout: number | undefined;

  const updatePosition = (append = false) => {
    let alignWithElem: HTMLElement | DOMRect;
    if (typeof (alignWith as DOMRect)?.x === 'number') {
      alignWithElem = alignWith as DOMRect;
    } else {
      alignWithElem = getElements(alignWith as ElemVueString)[0] as HTMLElement;
    }
    const [htmlElem] = getElements(elem);

    if (htmlElem && alignWithElem) {
      const portalToElem = getTargetParent();

      if (portalToElem) {
        const position = config.position || DEFAULT_POSITION;
        const align = config.align || DEFAULT_ALIGN;

        const appendAndPosition = () => {
          append && portalToElem.append(htmlElem);

          if (
            typeof (alignWithElem as DOMRect)?.x !== 'number' &&
            !elementsAreDisplayed(htmlElem, alignWithElem as HTMLElement)
          ) {
            return;
          }

          const repositionable = !!config.reposition;
          htmlElem.classList.add('sticky-portal');

          if (!repositionable) {
            return;
          }
          htmlElem.classList.add('sticky-portal-reposition');

          // must set the element's width before calculating position since height of the element might change after setting width
          if (config.fitWidth !== false && config.fitWidth !== undefined) {
            const width = getElement(config.fitWidth)?.getBoundingClientRect().width || 0;
            htmlElem.style.width = `${width}px`;
          }

          const {
            left,
            top,
            align: finalAlign,
            position: finalPosition,
          } = findScreenPositionWithoutBleedingOut(
            htmlElem,
            alignWithElem,
            position,
            align,
            config.offset
          );

          if (typeof left === 'undefined' || typeof top === 'undefined') {
            console.warn(
              `failed to get left and top. this is not suppose to happen. is elementsAreDisplayed's implementation not good enough?`
            );
            return;
          }

          htmlElem.setAttribute('portal-position', finalPosition as string);
          htmlElem.setAttribute('portal-align', finalAlign as string);
          htmlElem.style.transform = `translate(${left}px, ${(window.pageYOffset || 0) + top}px)`;
        };

        if (config.updateOnNextTick) {
          nextTick().then(appendAndPosition);
        } else {
          appendAndPosition();
        }
      }
    }
  };

  const append = (el?: ElemVueString) => {
    elem = el;
    updatePosition(true);
  };

  const remove = (elem?: ElemVueString) => {
    const htmlElem = getElement(elem);
    clearTimeout(screenChangeTimeout);
    if (htmlElem) {
      htmlElem.remove();
    }
  };

  const destroy = (removeElem = true) => {
    if (removeElem && elem) {
      remove(elem);
    }
    elem = undefined;
    clearTimeout(screenChangeTimeout);
    unregisterViewportListeners();
  };

  const onScreenChange = () => {
    clearTimeout(screenChangeTimeout);
    screenChangeTimeout = setTimeout(updatePosition, 30) as unknown as number;
  };

  const getTargetParent = () => {
    if (config.attachToFullscreenRoot && document.fullscreenElement) {
      return document.fullscreenElement;
    }

    return typeof portalTo === 'string' ? document.querySelector(portalTo) : portalTo;
  };

  const setAlignWith = (elem: ElemVueString | DOMRect | undefined) => {
    alignWith = elem;
  };

  const setPortalConfig = (newConfig: AppendConfig) => {
    config = newConfig;
  };

  const registerViewportListeners = () => {
    window.addEventListener('resize', onScreenChange, { passive: true });
    document.addEventListener('scroll', onScreenChange, { passive: true, capture: true });
  };

  const unregisterViewportListeners = () => {
    window.removeEventListener('resize', onScreenChange);
    document.removeEventListener('scroll', onScreenChange, true);
  };

  if (config.updateOnScreenChange) {
    registerViewportListeners();
  }

  return {
    append,
    remove,
    destroy,
    setAlignWith,
    setPortalConfig,
    updatePosition,
  };
}
