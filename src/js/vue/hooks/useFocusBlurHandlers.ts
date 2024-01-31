import { ref, watch, Ref } from 'vue';

const useFocusBlurHandlers = (elementRef?: Ref<HTMLElement | undefined>) => {
  const focused = ref(false);
  const hovered = ref(false);
  const wasFocusedAndReleased = ref(false);

  let optionBlurTimeout: number;
  const onBlur = () => {
    optionBlurTimeout = setTimeout(() => (focused.value = false)) as unknown as number;
  };

  const onFocus = () => {
    focused.value = true;
    clearTimeout(optionBlurTimeout);
  };

  if (elementRef) {
    watch(
      () => elementRef.value,
      (elem, oldElem) => {
        if (oldElem) {
          oldElem.removeEventListener('focus', () => (focused.value = true));
          oldElem.removeEventListener('blur', () => (focused.value = false));
          oldElem.removeEventListener('mouseenter', () => (hovered.value = true));
          oldElem.removeEventListener('mouseleave', () => (hovered.value = false));
        }
        if (elem) {
          elem.addEventListener('focus', () => {
            focused.value = true;
          });
          elem.addEventListener('blur', () => {
            wasFocusedAndReleased.value = true;
            focused.value = false;
          });
          elem.addEventListener('mouseenter', () => (hovered.value = true));
          elem.addEventListener('mouseleave', () => (hovered.value = false));
        }
      },
      { immediate: true }
    );
  }

  const reset = () => (wasFocusedAndReleased.value = false);

  return {
    focused,
    hovered,
    wasFocusedAndReleased,
    onBlur,
    onFocus,
    reset,
  };
};

export default useFocusBlurHandlers;
