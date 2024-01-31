import { computed, Ref } from 'vue';

const useIsTextOverflowing = (element: Ref<Element | undefined>) => {
  return computed<boolean>(
    () => !!element.value && element.value.scrollWidth > element.value.clientWidth
  );
};

export default useIsTextOverflowing;
