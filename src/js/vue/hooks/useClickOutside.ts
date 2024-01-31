import { onMounted, onUnmounted, ref } from 'vue';

import { ElemVueString, getElement, getElements } from '../utils/getElement';

const useClickOutside = (
  target: ElemVueString | ElemVueString[],
  clickOutsideHandler: (event: MouseEvent, target: EventTarget | null) => void
) => {
  const enabled = ref(true);

  const onClick = (event: MouseEvent) => {
    if (enabled.value) {
      let elems: (HTMLElement | null)[] = Array.isArray(target)
        ? getElements(...target)
        : [getElement(target)];

      const clickedNode: Node = event.target as Node;

      elems = elems.filter(
        (elem: HTMLElement | null) => !!elem && typeof elem['contains'] === 'function'
      );

      if (elems.find((elem) => elem?.contains(clickedNode)) === undefined) {
        // clicked node is not a descendent of the target(s)
        clickOutsideHandler(event, event.currentTarget);
      }
    }
  };

  onMounted(() => window.addEventListener('click', onClick));

  onUnmounted(() => window.removeEventListener('click', onClick));

  return {
    clickOutsideEnabled: enabled,
  };
};

export default useClickOutside;
