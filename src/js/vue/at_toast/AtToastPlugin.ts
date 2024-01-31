import { ref, nextTick, App, createApp, Plugin } from 'vue';

import createId from '@agritask/js-utils/libs/createId';

import AtToastList from './components/at_toast_list/AtToastList.vue';
import {
  AtToastOptions,
  AtToastOptionsWithId,
  AtToastPluginOptions,
  DEFAULT_POSITION,
  DEFAULT_STAY_DURATION,
  DEFAULT_TOAST_TYPE,
  ToastPosition,
  ToastsLists,
} from './types';

export const AtToast: Plugin = {
  install(app: App, pluginOptions: AtToastPluginOptions) {
    const timeouts = ref<{ [id: string]: number }>({});
    // Creates a map with key from ToastPosition and a value of a ref to an empty array
    const toasts: ToastsLists = Object.values(ToastPosition).reduce(
      (map, position: ToastPosition) => {
        map[position] = {
          initialized: ref(false),
          cards: ref<AtToastOptionsWithId[]>([]),
        };
        return map;
      },
      {} as ToastsLists
    );

    const create = (toastOptions: AtToastOptions): void => {
      const position = toastOptions.position || DEFAULT_POSITION;
      const ToastWithId = {
        ...toastOptions,
        type: toastOptions.type || DEFAULT_TOAST_TYPE,
        duration: toastOptions.duration ?? DEFAULT_STAY_DURATION,
        id: createId(`${position}@`),
      };
      toasts[position].cards.value.push(ToastWithId);
      if (!toasts[position].initialized.value) {
        createToastListComponent(
          position,
          {
            position,
            toasts: toasts[position].cards,
            toastListStyles: pluginOptions,
          },
          app.config.globalProperties
        );

        toasts[position].initialized.value = true;
      }

      nextTick().then(() => {
        if (ToastWithId.duration) {
          timeouts.value[ToastWithId.id] = window.setTimeout(() => {
            close(ToastWithId.id);
            delete timeouts.value[ToastWithId.id];
          }, ToastWithId.duration);
        }
      });
    };

    const close = (toastId: string): void => {
      ///the toastId[0] refers to the ToastPosition
      const position = toastId.split('@')[0];
      toasts[position as ToastPosition].cards.value = toasts[
        position as ToastPosition
      ].cards.value.filter((toast: AtToastOptionsWithId) => {
        if (toast.id === toastId) {
          if (timeouts.value[toastId]) {
            //Clears the toasts timeouts
            window.clearTimeout(timeouts.value[toastId]);
            delete timeouts.value[toastId];
          }
          return false;
        }
        return true;
      });
    };

    const clear = (): void => {
      Object.values(ToastPosition).map((key: ToastPosition) => {
        toasts[key].cards.value = [];
      });
      //Clears all timeout
      Object.values(timeouts.value).map(window.clearTimeout);
      timeouts.value = {};
    };

    app.config.globalProperties.$atToast = {
      create,
      close,
      clear,
    };
  },
};

export function createToastListComponent(
  position: ToastPosition,
  props: Record<string, unknown>,
  properties: Record<string, any>
) {
  const container = document.createElement('div');
  container.classList.add(`AtToastList-${position}`);
  document.body.appendChild(container);
  const app = createApp(AtToastList, props);
  app.config.globalProperties.$atToast = properties.$atToast;
  app.mount(container);
  return app;
}
