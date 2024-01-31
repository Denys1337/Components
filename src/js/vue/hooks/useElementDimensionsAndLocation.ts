import { onBeforeUnmount, reactive, Ref, toRefs, watch } from 'vue';

import { debounce } from 'lodash-es';

export interface Dimensions {
  height?: number;
  width?: number;
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
  x?: number;
  y?: number;
}

export default function useElementDimensionsAndLocation(
  elementRef: Ref<undefined | Element>,
  updateOnScroll?: boolean,
  updateOnResize?: boolean
) {
  const dimensions = reactive<Dimensions>({
    height: undefined,
    width: undefined,
    top: undefined,
    bottom: undefined,
    right: undefined,
    left: undefined,
    x: undefined,
    y: undefined,
  });

  const windowDimensions = reactive<{ windowHeight: number; windowWidth: number }>({
    windowHeight: 0,
    windowWidth: 0,
  });

  const debounceExtractDetails = debounce(() => {
    extractDetails();
  }, 50);

  watch(
    () => elementRef.value,
    (_, prevValue) => {
      if (prevValue) {
        removeEventListeners();
      }
      attachEventListeners();
      extractDetails();
    }
  );

  const attachEventListeners = () => {
    if (!elementRef.value) {
      return;
    }
    if (updateOnResize) {
      window.addEventListener('resize', debounceExtractDetails, { passive: true });
    }
    if (updateOnScroll) {
      window.addEventListener('scroll', debounceExtractDetails, { capture: true, passive: true });
    }
  };

  const extractDetails = () => {
    if (!elementRef.value) {
      return;
    }
    const { height, width, top, bottom, right, left, x, y } =
      elementRef.value.getBoundingClientRect();

    dimensions.height = height;
    dimensions.width = width;
    dimensions.top = top;
    dimensions.bottom = bottom;
    dimensions.right = right;
    dimensions.left = left;
    dimensions.x = x;
    dimensions.y = y;

    windowDimensions.windowWidth = window.innerWidth;
    windowDimensions.windowHeight = window.innerHeight;
  };

  onBeforeUnmount(() => {
    removeEventListeners();
  });

  const removeEventListeners = () => {
    window.removeEventListener('resize', debounceExtractDetails);
    window.removeEventListener('scroll', debounceExtractDetails, { capture: true });
  };

  return { ...toRefs(dimensions), ...toRefs(windowDimensions), refresh: extractDetails };
}
