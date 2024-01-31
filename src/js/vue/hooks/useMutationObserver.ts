import { onMounted, onUnmounted, ref, Ref, watch } from 'vue';

const useMutationObserver = (
  target: Ref<HTMLElement | undefined>,
  onMutated: Function | undefined = undefined,
  enableOnMount = false
) => {
  let isEnabled = false;
  const observer: Ref<MutationObserver | undefined> = ref();
  const onMutatedHandlers: Function[] = onMutated ? [onMutated] : [];

  const config = { attributes: true, childList: true, subtree: true };
  const onMutation = () => {
    onMutatedHandlers.forEach((cb) => cb());
  };

  const startObserving = () => {
    if (!isEnabled && target.value) {
      isEnabled = true;
      observer.value = new MutationObserver(onMutation);
      observer.value.observe(target.value, config);
    }
  };

  const stopObserving = () => {
    if (isEnabled) {
      if (observer.value) {
        observer.value.disconnect();
        observer.value = undefined;
      }
      isEnabled = false;
    }
  };

  onMounted(() => enableOnMount && startObserving());
  onUnmounted(() => {
    stopObserving();
    onMutatedHandlers.length = 0;
  });

  watch(
    () => target.value,
    (target) => {
      if (target && isEnabled) {
        stopObserving();
        startObserving();
      }
    }
  );

  const regieterOnMutated = (cb: Function) => {
    onMutatedHandlers.push(cb);
  };
  const unregieterOnMutated = (cb: Function) => {
    const index = onMutatedHandlers.indexOf(cb);
    if (index > -1) {
      onMutatedHandlers.splice(index, 1);
    }
  };

  return {
    observer,
    startObserving,
    stopObserving,
    regieterOnMutated,
    unregieterOnMutated,
  };
};

export default useMutationObserver;
