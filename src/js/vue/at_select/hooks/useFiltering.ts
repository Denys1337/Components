import { ref, watch, Ref, computed } from 'vue';

import { stringIncludesQueryInsensitive } from '@agritask/js-utils/libs/string_utils';

import getTranslators from '../../utils/getTranslators';
import { Option, OptionGroup, OptsOrGroups } from '../types';

export const MIN_OPTIONS_FOR_FILTERING_DEFAULT = 8;

export default function useFiltering(
  textField: Ref<string>,
  valueField: Ref<string>,
  options: Ref<OptsOrGroups>,
  filter: Ref<boolean>,
  optionsAreGrouped: Readonly<Ref<boolean>>,
  flattenOptions: Ref<Option[]>,
  minOptionsForFiltering: number = MIN_OPTIONS_FOR_FILTERING_DEFAULT
) {
  const { t } = getTranslators();

  const optionTextIncludesString = (opt: Option, q: string) => {
    if (opt.translate) {
      return stringIncludesQueryInsensitive(t(opt[textField.value]), q);
    }
    return stringIncludesQueryInsensitive(opt[textField.value], q);
  };

  const optionValueIncludesString = (opt: Option, q: string) =>
    typeof opt[valueField.value] === 'string' &&
    stringIncludesQueryInsensitive(opt[valueField.value], q);

  const filterOptionsWithString = (opts: Option[], q: string) =>
    opts.filter(
      (opt: Option) => optionTextIncludesString(opt, q) || optionValueIncludesString(opt, q)
    );

  const filteredOptions = ref<Option[]>([]);
  const filterQuery = ref('');

  const onFilter = (q: string) => {
    const filterOn = q.startsWith(filterQuery.value) ? filteredOptions.value : options.value;
    filterQuery.value = q;
    if (filterQuery.value.trim() === '') {
      // empty filter string - show all
      filteredOptions.value = options.value || [];
    } else if (optionsAreGrouped.value) {
      // groups
      const groups: OptionGroup[] = [];
      for (let i = 0; i < filterOn.length; i++) {
        const group = filterOn[i] as OptionGroup;
        const groupOptions = filterOptionsWithString(group.options, filterQuery.value);
        if (groupOptions.length) {
          // only groups with options passing the filter will be displayed
          groups.push({
            title: group.title,
            options: groupOptions,
          });
        }
      }
      filteredOptions.value = groups;
    } else {
      // flat
      filteredOptions.value = filterOptionsWithString(filterOn, filterQuery.value);
    }
  };

  watch(
    () => options.value,
    () => {
      filteredOptions.value = options.value;
      onFilter(filterQuery.value);
    },
    { immediate: true }
  );

  const enableFiltering = computed(() => {
    if (typeof filter.value === 'boolean') {
      return filter.value;
    }

    if(textField.value){
      return  true
    }

    return flattenOptions.value?.length >= minOptionsForFiltering;
  });

  return {
    filteredOptions,
    onFilter,
    enableFiltering,
  };
}
