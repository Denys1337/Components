import { onBeforeUnmount, onUnmounted, Ref, watch } from 'vue';

import { ElementReference } from '../types';

interface useAttachEventsToLauncherArgs {
  triggerWithClick: Ref<boolean | undefined>;
  showTooltip: Ref<boolean>;
  launcherRef: ElementReference;
  tooltipId: string;
  show: Ref<boolean | undefined>;
  delay: Ref<number | undefined>;
}

export default function useAttachEventsToLauncher({
  triggerWithClick,
  showTooltip,
  launcherRef,
  tooltipId,
  show,
  delay,
}: useAttachEventsToLauncherArgs) {
  let timeoutId: number;
  const closeTooltip = () => {
    if (show.value !== undefined) return;
    clearTimeout(timeoutId);
    showTooltip.value = false;
  };

  const openTooltip = () => {
    if (show.value !== undefined) return;
    if (delay) {
      timeoutId = setTimeout(() => {
        showTooltip.value = true;
      }, delay.value) as unknown as number;
      onUnmounted(() => {
        clearTimeout(timeoutId);
      });
    } else {
      showTooltip.value = true;
    }
  };

  const onKeyup = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeTooltip();
    }
  };

  let mousedown = false;

  const onMousedown = () => {
    mousedown = true;
  };

  const onMouseup = () => {
    mousedown = false;
    showTooltip.value ? closeTooltip() : openTooltip();
  };

  const onFocus = () => {
    if (mousedown) return;
    openTooltip();
  };

  const onBlur = () => {
    mousedown = false;
    closeTooltip();
  };

  const events = [
    { type: 'focus', handler: onFocus },
    { type: 'blur', handler: onBlur },
    { type: 'keyup', handler: onKeyup },
  ];

  if (triggerWithClick.value) {
    events.push({ type: 'mousedown', handler: onMousedown });
    events.push({ type: 'mouseup', handler: onMouseup });
  } else {
    events.push(
      { type: 'mouseenter', handler: openTooltip },
      { type: 'mouseleave', handler: closeTooltip }
    );
  }

  const attachEventListeners = () => {
    if (launcherRef.value) {
      if (launcherRef.value.matches(':hover') && !triggerWithClick.value && !delay) {
        // Hovering on the element before the events were attached
        openTooltip();
      }
      events.forEach((event) => {
        // @ts-ignore TS isn't able to auto detect the corresponding event type
        launcherRef.value!.addEventListener(event.type, event.handler);
      });
      launcherRef.value!.setAttribute('aria-describedby', tooltipId);
    }
  };

  onBeforeUnmount(() => {
    removeEventListeners(launcherRef.value);
  });

  const removeEventListeners = (target?: Element) => {
    if (!target) {
      return;
    }
    events.forEach((event) => {
      // @ts-ignore TS isn't able to auto detect the corresponding event type
      target.removeEventListener(event.type, event.handler);
    });
  };

  watch(
    () => launcherRef.value,
    (_, prevValue) => {
      removeEventListeners(prevValue);
      attachEventListeners();
    },
    { immediate: true }
  );
}
