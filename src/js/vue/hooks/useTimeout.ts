import { onBeforeUnmount } from 'vue';

export default () => {
  let id: number | undefined;

  const clear = () => {
    clearTimeout(id);
  };

  const timeout = (callback: Function, delay?: number) => {
    clear();
    id = setTimeout(callback, delay);
  };

  onBeforeUnmount(clear);

  return { timeout, clear };
};
