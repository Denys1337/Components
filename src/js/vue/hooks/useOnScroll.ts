import { onMounted, onUnmounted } from 'vue';

import { ElemVueString, getElement } from '../utils/getElement';

type Listener = (ev: Event) => void;

const mouseIsOverElem = (elem: HTMLElement | null, { x, y }: { x: number; y: number }) => {
  if (!elem) return false;
  const rect = elem.getBoundingClientRect();
  return y >= rect.top && y <= rect.bottom && x >= rect.left && x <= rect.right;
};

const useOnScroll = (handler: Listener, ignoreEventsFrom?: ElemVueString[]) => {
  const mousePosition = { x: -Infinity, y: -Infinity };

  const listener: Listener = (ev: Event) => {
    const matchedIgnoredElem = ignoreEventsFrom?.find((ignoreElem) => {
      const ignoredElem = getElement(ignoreElem);
      if (
        ignoredElem === ev.target ||
        (ignoredElem && ignoredElem.contains && ignoredElem.contains(ev.target as Node)) ||
        mouseIsOverElem(ignoredElem, mousePosition)
      ) {
        return true;
      }
      return false;
    });

    if (!matchedIgnoredElem) {
      handler(ev);
    }
  };

  const onMouseMove = (ev: MouseEvent) => {
    mousePosition.x = ev.clientX;
    mousePosition.y = ev.clientY;
  };

  onMounted(() => {
    document.addEventListener('scroll', listener, {
      passive: true,
      capture: true,
    });
    document.addEventListener('mousemove', onMouseMove, {
      passive: true,
      capture: true,
    });
  });

  onUnmounted(() => {
    document.removeEventListener('scroll', listener, true);
    document.removeEventListener('mousemove', onMouseMove, true);
  });
};

export default useOnScroll;
