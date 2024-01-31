import { computed, Ref, unref } from 'vue';

import { truncateString } from '../utils/truncateString';

export const DEFAULT_CLAMP_VALUE = '...';

const useTruncatedString = (
  text: string | Ref<string>,
  length: number,
  clamp = DEFAULT_CLAMP_VALUE
) => computed(() => truncateString(unref(text), length, clamp));

export default useTruncatedString;
