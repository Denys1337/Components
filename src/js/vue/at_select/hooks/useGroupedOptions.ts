import { ref, watch, computed, Ref } from 'vue';

import { Option, OptionGroup, OptsOrGroups } from '../types';

export default function useGroupedOptions(options: Ref<OptsOrGroups>) {
  const optionsAreGrouped = computed(() =>
    options.value?.some((option: Option | OptionGroup) => Array.isArray(option.options))
  );

  // used to find selected values (simpler when using groups)
  const flattenOptions = ref<Option[]>([]);

  // TODO: maybe replace with 'computed'
  watch(
    () => options.value,
    (opts) => {
      if (optionsAreGrouped.value) {
        // options are grouped - flatten the options from the groups to a single 1D array
        // @ts-ignore
        const flat = opts.reduce((acc: Option[], option: OptionGroup | Option) => {
          if (option.options && Array.isArray(option.options)) {
            return [...acc, ...option.options];
          }
          return [...acc, option];
        }, []);
        flattenOptions.value = flat;
      } else {
        flattenOptions.value = opts;
      }
    },
    { immediate: true }
  );

  return {
    optionsAreGrouped,
    flattenOptions,
  };
}
