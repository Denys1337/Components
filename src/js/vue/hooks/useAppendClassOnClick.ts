import { watch, Ref } from 'vue';

import useTimeout from './useTimeout';

export default function useAppendClassOnClick(
  elemRef: Ref<HTMLElement | undefined>,
  classDurationMS = 250,
  className = 'clicked'
) {
  const { timeout, clear } = useTimeout();

  const onClicked = (e: MouseEvent) => {
    clear();
    const elem = e.currentTarget as HTMLElement;
    if (elem) {
      elem.classList.add(className);
      timeout(() => elem.classList.remove(className), classDurationMS);
    }
  };

  watch(
    () => elemRef.value,
    (elem, oldElem) => {
      oldElem && oldElem.removeEventListener('click', onClicked);
      elem && elem.addEventListener('click', onClicked);
    },
    { immediate: true }
  );
}
