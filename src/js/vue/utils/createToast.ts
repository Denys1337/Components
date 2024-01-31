import { ComponentOptionsBase, ComponentPublicInstance } from 'vue';

import { AtToastOptions } from '../at_toast/types';

const createToast = (
  vm:
    | ComponentPublicInstance<
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        false,
        ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>
      >
    | null
    | undefined,
  props: AtToastOptions
) => {
  vm?.$atToast.create(props);
};
export default createToast;
