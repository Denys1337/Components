import { ref, onUnmounted, Ref } from 'vue';

const useColumnResize = (elementRef: Ref<HTMLElement>, handleDrag: (e: MouseEvent) => void) => {
  const startWidth = ref<number>(0);
  const startingMousePosition = ref<number>(0);
  const isResizing = ref<boolean>();

  const handleResizeInit = (ev: MouseEvent) => {
    isResizing.value = true;

    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleResizeEnd);

    startWidth.value = elementRef.value.clientWidth;
    startingMousePosition.value = ev.clientX;
  };

  const handleResizeEnd = () => {
    isResizing.value = false;
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', handleResizeEnd);
  };

  onUnmounted(() => {
    handleResizeEnd();
  });

  return {
    isResizing,
    startingMousePosition,
    handleResizeInit,
    startWidth,
  };
};
export default useColumnResize;
