import { ref } from 'vue';

import { deepClone } from '@agritask/js-utils/libs/object_utils';

import {
  IFilter,
  defaultFilterFieldMap,
  FilterFieldMap,
  OptionsGetterFunction,
  CustomFilterFieldMap,
} from '../at_filter/types';

export default function useFilterFieldParser(
  filter: IFilter,
  optionals: {
    customFieldComponentMap?: CustomFilterFieldMap;
    optionsGetter?: OptionsGetterFunction;
    requestParams?: object;
    options?: object;
  } = {}
) {
  const status = ref('auto');
  //Mergin the custom map with the default one
  let filterFieldMap;
  if (!optionals.customFieldComponentMap) {
    filterFieldMap = defaultFilterFieldMap;
  } else {
    const newMap: FilterFieldMap = deepClone(defaultFilterFieldMap);
    Object.keys(optionals.customFieldComponentMap).map((filterFieldType) => {
      newMap[filterFieldType] = {
        ...newMap[filterFieldType],
        ...(optionals.customFieldComponentMap?.[filterFieldType] || {}),
      };
    });
    filterFieldMap = newMap;
  }
  const field = filterFieldMap[filter.type];
  //Clones the value so we can see change in Real-time if theres a debounce
  const valueClone = filter.value || '';

  const fieldProps = {
    ...field.props,
    label: filter.title || '',
    placeholder: filter.title || '',
    requestParams: optionals.requestParams,
    requestFunction: (params?: unknown) => {
      status.value = 'loading';
      return (
        optionals
          .optionsGetter?.(filter.name, params)
          .then((options) => {
            status.value = 'auto';
            return options;
          })
          .catch(() => {
            status.value = 'error';
          }) || Promise.resolve(optionals.options)
      );
    },

    options: optionals.options,
  };

  return {
    valueParser: field.parser,
    valueFormatter: field.formatter,
    type: field.type,
    fieldProps,
    value: valueClone,
    status,
    customFieldComponentMap: filterFieldMap,
  };
}
