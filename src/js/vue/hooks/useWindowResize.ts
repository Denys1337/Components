import { onMounted, onUnmounted, ref } from 'vue';

type UIEventHandler = (event: UIEvent) => any | void;

const useWindowResize = (callback?: UIEventHandler, delay: number = 100) => {
  let timeout: number;
  const windowWidth = ref(window.innerWidth);
  const windowheight = ref(window.innerHeight);

  const onResizeRef = ref<UIEventHandler>((event: UIEvent) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      windowWidth.value = window.innerWidth;
      windowheight.value = window.innerHeight;
      callback && callback(event);
    }, delay) as unknown as number;
  });

  onMounted(() => {
    window.addEventListener('resize', onResizeRef.value, { passive: true });
  });

  onUnmounted(() => {
    clearTimeout(timeout);
    window.removeEventListener('resize', onResizeRef.value);
  });

  return {
    windowWidth,
    windowheight,
  };
};

export default useWindowResize;
