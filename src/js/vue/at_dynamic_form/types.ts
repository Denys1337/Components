import { Component, PropType, InjectionKey } from 'vue';

import { FieldComponentMap } from '../dynamic_field/types';
import { QuestionMenuListItem } from './at_form_builder/components/at_form_builder_question/types';
import { AtFormBuilderQuestion } from './at_form_builder/types';

export enum AtQuestionType {
  ShortText = 'TEXT_INPUT',
  LongText = 'TEXT_AREA',
  Boolean = 'BOOLEAN',
  Select = 'SINGLE_SELECT',
  UnitNumeric = 'UNIT_NUMERIC',
  MultiSelect = 'MULTI_SELECT',
  Number = 'NUMERIC',
  Slider = 'slider',
  RangeSlider = 'range_slider',
}

export interface TranslatableField {
  [key: string]: string;
}
export interface AtQuestionSettings {
  required: boolean;
  editable?: boolean;
  max?: number;
  min?: number;
  placeholder?: TranslatableField;
}
export interface Option {
  value: string;
  label: TranslatableField;
}
export type AtQuestionTypeComponentMap = Record<AtQuestionType | string, Component>;

export const AtFormBuilderQuestionProps = {
  id: { type: String, required: true },
  title: { type: Object as PropType<Record<string, string>>, required: true },
  modelValue: {
    type: Object as PropType<AtFormBuilderQuestion>,
  },
  questionMenuList: {
    type: Array as PropType<QuestionMenuListItem[]>,
  },
  settings: {
    type: Object as PropType<AtQuestionSettings>,
    default: () => ({
      required: false,
    }),
  },
} as const;

export const AtFormQuestionProps = {
  title: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  settings: {
    type: Object as PropType<AtQuestionSettings>,
    default: () => ({
      required: false,
    }),
  },
  toolTip: {
    type: Object as PropType<TranslatableField>,
  },
  questionHierarchyText: {
    type: String,
  },
  modelValue: {
    type: String,
    default: '',
  },
  popupButtonsDisabled: {
    type: Boolean,
    default: false,
  },
  questionButtonsDisabled: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<Option[]>,
    default: () => [],
  },
};

export const QUESTION_COMPONENT_MAP: InjectionKey<FieldComponentMap> = Symbol.for(
  'DynamicFormQuestionComponentMap'
);

export type FieldValue = string | UnitNumericModelValue;

export type UnitNumericModelValue = {
  inputValue: string;
  valueType: string;
};
