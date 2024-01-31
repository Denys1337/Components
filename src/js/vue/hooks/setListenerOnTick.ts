import { nextTick } from 'vue';

export const setListenerOnNextTick = (
  id: string,
  event: string,
  callback: EventListenerOrEventListenerObject
) => {
  nextTick(() => {
    document.getElementById(id)?.addEventListener(event, callback);
  });
};
