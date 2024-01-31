import { onMounted, onUnmounted, Ref, watch } from 'vue';

import debounce from 'lodash-es/debounce';
import ResizeObserverPolyfill from 'resize-observer-polyfill';

export default (
  targetElementRef: Ref<Element | HTMLElement | undefined>,
  initialCallback: (ele: ResizeObserverEntry) => void,
  debounceCount?: number
) => {
  let tableResizeObserver: ResizeObserverPolyfill;
  let observerInitialized = false;
  const callback = debounceCount ? debounce(initialCallback, debounceCount) : initialCallback;
  onMounted(() => {
    const ResizeObserver: typeof ResizeObserverPolyfill =
      'ResizeObserver' in window ? (window as any).ResizeObserver : ResizeObserverPolyfill;
    tableResizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        callback(entry);
      }
    });
    watch(
      () => targetElementRef.value,
      (element) => {
        if (element && !observerInitialized) {
          observerInitialized = true;
          tableResizeObserver.observe(element);
        }
      },
      { immediate: true }
    );
  });
  onUnmounted(() => {
    tableResizeObserver && tableResizeObserver.disconnect();
  });
};
