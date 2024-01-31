import { ref, Ref } from 'vue';

import createId from '@agritask/js-utils/libs/createId';

import useIsTextOverflowing from '../../../hooks/useIsTextOverflowing';

const useShowToolTipOnOverflow = (
  elemRef: Ref<Element | undefined>,
  emit: (eventName: 'show-tooltip', ...args: any[]) => void,
  message: string
) => {
  const id: Ref<string | undefined> = ref();
  const textOverflow = useIsTextOverflowing(elemRef);
  const hoverHandler = () => {
    if (textOverflow.value) {
      id.value = id.value || createId('table_cell');
      emit('show-tooltip', { id: id.value, message });
    }
  };
  return { hoverHandler, id };
};

export default useShowToolTipOnOverflow;
