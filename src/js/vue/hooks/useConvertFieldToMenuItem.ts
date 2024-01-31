import { Ref, computed } from 'vue';

import { ActionType } from '../at_action_bar/types';
import { IFilter, OptionsGetterFunction, CustomFilterFieldMap } from '../at_filter/types';
import useFilterFieldParser from './useFilterFieldParser';

export default function useConvertFieldToMenuItem(params: {
  customFieldComponentMap?: Ref<CustomFilterFieldMap>;
  optionsGetter?: Ref<OptionsGetterFunction>;
  requestParams?: Ref<any>;
  props: any;
}) {
  const { optionsGetter, customFieldComponentMap, requestParams, props } = params;
  return (filter: IFilter) =>
    computed(() => {
      const { valueParser, valueFormatter, type, fieldProps, value, status } = useFilterFieldParser(
        filter,
        {
          requestParams: requestParams?.value,
          optionsGetter: optionsGetter?.value,
          customFieldComponentMap: customFieldComponentMap?.value,
        }
      );
      return {
        actionType: 'field' as ActionType,
        label: filter.title,
        name: filter.name,
        menuItemProps: {
          type,
          valueParser,
          valueFormatter,
          value,
          status: status.value,
          ...props,
          fieldProps: { ...fieldProps, ...props.fieldProps },
        },
      };
    });
}
