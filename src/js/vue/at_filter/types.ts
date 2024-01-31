import { FieldType } from '../dynamic_field/types';
export interface IFilter {
  id?: string;
  name: string;
  type: FilterType;
  title: string;
  visible?: boolean;
  value?: string;
  updated?: boolean;
  pinned?: boolean;
  options?: Option[];
  dependent?: string[];
}

export enum FilterType {
  DateFilter = 'DateFilter',
  MultiselectFilter = 'MultiselectFilter',
  LookupFilter = 'LookupFilter',
  BooleanFilter = 'BooleanFilter',
  DateRangeFilter = 'DateRangeFilter',
  FreeTextSearchFilter = 'FreeTextSearchFilter',
  NumberFilter = 'NumberFilter',
  PaginatedMultiselectFilter = 'PaginatedMultiselectFilter',
}

export interface BaseOption {
  value?: any;
  text?: string;
}

export interface Option extends BaseOption {
  translate?: boolean;
  [key: string]: any;
}

export interface OptionGroup {
  title: string;
  options: Option[];
}

export type OptsOrGroups = Option[] | OptionGroup[];

export type FilterFieldMap = {
  [key: string]: FilterFieldOption;
};
export type CustomFilterFieldMap = {
  [key: string]: Partial<FilterFieldOption>;
};
export type FilterFieldOption = {
  type: FieldType;
  props?: any;
  debounceTime?: number;
  parser?: (value: any) => any;
  formatter?: (value: any) => any;
};

export type OptionsGetterFunction = (filterName: string, params?: any) => Promise<any[]>;

export const defaultFilterFieldMap: FilterFieldMap = {
  // TODO: #PLAT-1852 added those fields once all form fields are migrate to vue-components
  //   [FilterType.DateFilter]: {
  //     type: FieldType.DateField,
  //     props: {
  //       pattern: 'dd/MM/yyyy',
  //       required: false,
  //     },
  //   },
  //   [FilterType.DateRangeFilter]: {
  //     type: FieldType.DateRangeField,
  //     props: {
  //       pattern: 'dd/MM/yyyy',
  //       required: false,
  //     },
  //   },
  [FilterType.MultiselectFilter]: {
    type: FieldType.SelectRequestOptions,
    props: {
      required: false,
      multiple: true,
      valueField: 'value',
      textField: 'name',
    },
  },
  [FilterType.LookupFilter]: {
    type: FieldType.SelectRequestOptions,
    props: {
      required: false,
      valueField: 'value',
      textField: 'name',
    },
  },
  [FilterType.BooleanFilter]: {
    type: FieldType.BooleanField,
    props: {
      required: false,
    },
  },
  [FilterType.FreeTextSearchFilter]: {
    type: FieldType.TextField,
    props: {
      required: false,
      debounceTime: 400,
    },
  },
  [FilterType.NumberFilter]: {
    type: FieldType.NumberField,
    props: {
      required: false,
      debounceTime: 400,
    },
  },
};
