import { onBeforeUnmount } from 'vue';

export default () => {
  let id: number | undefined;
  let lastCBInvokationTime: number = 0;

  let postponeStartTime = 0;
  let postponeResumedTimeout = 0;
  let callbackFunc: Function;
  let callbackDelay: number;

  const clear = () => {
    clearInterval(id);
    clearTimeout(postponeResumedTimeout);
  };

  const postponeCallbacking = () => {
    clear();
    postponeStartTime = new Date().getTime();
  };

  const resumeCallbacking = () => {
    if (!postponeStartTime && !callbackFunc && !callbackDelay) {
      return;
    }

    const now = new Date().getTime();

    const expectedCallbackInvokationTime = lastCBInvokationTime + callbackDelay;
    const deltaFromPostponeToExpected = expectedCallbackInvokationTime - now;
    const timePassedSincePostpone = now - postponeStartTime;

    const deltaToExpectedInvocationTime = deltaFromPostponeToExpected - timePassedSincePostpone;

    postponeResumedTimeout = setTimeout(() => {
      callbackFunc();
      interval(callbackFunc, callbackDelay);
    }, deltaToExpectedInvocationTime) as unknown as number;
    postponeStartTime = 0;
  };

  const interval = (callback: Function, delay: number) => {
    lastCBInvokationTime = new Date().getTime();
    callbackFunc = callback;
    callbackDelay = delay;
    clear();
    id = setInterval(() => {
      lastCBInvokationTime = new Date().getTime();
      callback();
    }, delay) as unknown as number;
  };

  onBeforeUnmount(clear);

  return { interval, clear, postponeCallbacking, resumeCallbacking };
};
