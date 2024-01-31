import { Component } from 'vue';

import AtCheckbox from '../at_checkbox/AtCheckbox.vue';
import { AtCheckboxProps } from '../at_checkbox/types';
import AtInput from '../at_input/AtInput.vue';
import { Props as AtInputProps } from '../at_input/types';
export interface DynamicFieldProps {
  customFieldComponentMap: FieldComponentMap;
  type: string;
  fieldProps: Object;
  modelValue: ModelType;
  valueParser: (value?: any) => ModelType;
  valueFormatter: (value?: ModelType) => any;
}

export type ModelType = string | boolean | number | string[] | boolean[] | number[] | Date | Object;

interface FieldComponent {
  component: Component | (() => Promise<typeof import('*.vue')>);
  props: unknown;
}

export type FieldComponentMap = {
  [key: string]: (props: any) => FieldComponent;
};

// currently we only have checkbox and input in vue-components this should
// be controled here once will migrate all components to vue-components
//
export enum FieldType {
  DateField = 'DateField',
  DateRangeField = 'DateRangeField',
  SelectField = 'SelectField',
  SelectRequestOptions = 'SelectRequestOptions',
  MultiSelectField = 'MultiSelectField',
  BooleanField = 'BooleanField',
  TextField = 'TextField',
  NumberField = 'NumberField',
  RadioField = 'RadioField',
}

export const defaultFieldMap: FieldComponentMap = {
  [FieldType.BooleanField]: (props: AtCheckboxProps) =>
    ({
      component: AtCheckbox,
      props,
    } as FieldComponent),
  [FieldType.TextField]: (props: AtInputProps) => ({
    component: AtInput,
    props: { ...props, type: 'text' } as AtInputProps,
  }),
  [FieldType.NumberField]: (props: AtInputProps) => ({
    component: AtInput,
    props: { ...props, type: 'number' } as AtInputProps,
  }),
  //   [FieldType.DateField]: (props: DatePickerProps) => ({
  //     component: AtDatePicker,
  //     props,
  //   }),
  //   [FieldType.DateRangeField]: (props: DatePickerProps) => ({
  //     component: AtDatePicker,
  //     props: { ...props, type: 'date-range' } as DatePickerProps,
  //   }),
  //   [FieldType.SelectField]: (props: AtSelectProps) => ({
  //     component: AtSelect,
  //     props,
  //   }),
  //   [FieldType.MultiSelectField]: (props: AtSelectProps) => ({
  //     component: AtSelect,
  //     props: { ...props, multiple: true },
  //   }),
  // [FieldType.SelectRequestOptions]: (props: AtSelectProps) => ({
  //   component: AtSelectRequestOptions,
  //   props,
  // }),
  //   [FieldType.RadioField]: (props: AtRadiogroupProps) => ({
  //     component: AtRadiogroup,
  //     props,
  //   }),
};
