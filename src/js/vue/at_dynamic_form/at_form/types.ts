import { Component } from 'vue';

import { FileToDisplay } from '../../at_file_upload/types';
import { BaseOption } from '../../at_select/types';
import { FieldComponentMap } from '../../dynamic_field/types';
import { AtQuestionType, TranslatableField } from '../types';
import { UnitNumericModelValue } from '../types';
import AtFormQuestionReview from './components/AtFormQuestionReview.vue';
import AtFormQuestionWrapperStack from './components/AtFormQuestionWrapperStack.vue';
import AtFormQuestionWrapper from './components/at_form_question_wrapper/AtFormQuestionWrapper.vue';
import AtFormBooleanQuestion from './components/questions/at_form_boolean_question/AtFormBooleanQuestion.vue';
import AtFormLongTextQuestion from './components/questions/at_form_long_text_question/AtFormLongTextQuestion.vue';
import AtFormMultiSelectQuestion from './components/questions/at_form_multi_select_question/AtFormMultiSelectQuestion.vue';
import AtFormNumericQuestion from './components/questions/at_form_numeric_question/AtFormNumericQuestion.vue';
import AtFormSelectQuestion from './components/questions/at_form_select_question/AtFormSelectQuestion.vue';
import AtFormShortTextQuestion from './components/questions/at_form_short_text_question/AtFormShortTextQuestion.vue';
import AtFormUnitNumericQuestion from './components/questions/at_form_unit_numeric_question/AtFormUnitNumericQuestion.vue';
import AtFormStackSectionWrapper from './components/sections/at_form_stack_section/AtFormStackWrapper.vue';

export const defaultAtFormQuestionTypeComponentMap: FieldComponentMap = {
  [AtQuestionType.Boolean]: (props: unknown) => ({
    component: AtFormBooleanQuestion,
    props,
  }),
  [AtQuestionType.ShortText]: (props: unknown) => ({
    component: AtFormShortTextQuestion,
    props,
  }),
  [AtQuestionType.LongText]: (props: unknown) => ({
    component: AtFormLongTextQuestion,
    props,
  }),
  [AtQuestionType.Select]: (props: unknown) => ({
    component: AtFormSelectQuestion,
    props,
  }),
  [AtQuestionType.MultiSelect]: (props: unknown) => ({
    component: AtFormMultiSelectQuestion,
    props,
  }),
  [AtQuestionType.Number]: (props: unknown) => ({
    component: AtFormNumericQuestion,
    props,
  }),
  [AtQuestionType.UnitNumeric]: (props: unknown) => ({
    component: AtFormUnitNumericQuestion,
    props,
  }),
  [AtQuestionType.Slider]: (props: unknown) => ({
    component: AtFormBooleanQuestion,
    props,
  }),
  [AtQuestionType.RangeSlider]: (props: unknown) => ({
    component: AtFormBooleanQuestion,
    props,
  }),
};
export type RepeatableNotes = AtFormQuestionNote[][];
export interface IAtFormSubSection extends AtFormElement {
  sectionType: AtFormSectionType;
  fields: AtFormQuestion[];
  notes: RepeatableNotes | AtFormQuestionNote[];
  settings: {
    grouped: boolean;
    repeatable: boolean;
    minStack: number;
    maxStack: number | null;
  };
}
export type AtFormSubSectionOrQuestion = IAtFormSubSection | AtFormQuestion;

export enum AtFormSectionType {
  STACK = 'SUBSECTION',
}

export enum AtFormElementType {
  Field = 'Field',
  Section = 'SECTION',
}

export type AtFormElementTypeComponentMapType = Record<
  AtFormElementType | string,
  ComponentOrLazyComponent
>;

export type AtFormSubSectionTypeComponentMapType = Record<
  AtFormSectionType,
  ComponentOrLazyComponent
>;

export const AtFormSubSectionTypeComponentMap: AtFormSubSectionTypeComponentMapType = {
  [AtFormSectionType.STACK]: AtFormStackSectionWrapper,
};

export interface AtFormElement {
  type: AtFormElementType;
  id: string;
  title: string;
  value: string | Record<string, unknown> | UnitNumericModelValue | Record<string, unknown>[];
}

export interface AtFormQuestion extends AtFormElement {
  status: AtQuestionStatus;
  fieldType: AtQuestionType;
  settings: {
    required: boolean;
    editable?: boolean;
    placeholder?: TranslatableField;
  };
  toolTip?: TranslatableField;
  options: BaseOption[];
  notes: AtFormQuestionNote[];
}

export enum AtQuestionStatus {
  Open = 'OPEN',
  Failed = 'FAIL',
  Pending = 'PENDING',
  Passed = 'PASS',
}

export interface AtFormQuestionNote {
  text: string;
  imageIds: string[];
  lastEditor: string;
  lastUpdate: string;
  files: FileToDisplay[];
}

export interface AtFormQuestionProps {
  question: AtFormQuestion;
  questionHierarchyText: string;
  isBackButtonDisabled: boolean;
  formButtonsDisabled: boolean;
  showPrevButton?: boolean;
  showSubmitButton?: boolean;
  showNextButton?: boolean;
  questionWrapperComponentType: AtFormWrapperType;
}

export enum AtFormWrapperType {
  Review = 'REVIEW',
  Default = 'DEFAULT',
  Stack = 'STACK',
}
export type AtFormQuestionWrapperTypeMapType = Record<
  AtFormWrapperType | string,
  ComponentOrLazyComponent
>;

export const AtFormQuestionWrapperTypeMap: AtFormQuestionWrapperTypeMapType = {
  [AtFormWrapperType.Default]: AtFormQuestionWrapper,
  [AtFormWrapperType.Review]: AtFormQuestionReview,
  [AtFormWrapperType.Stack]: AtFormQuestionWrapperStack,
};

export type ComponentOrLazyComponent = Component | (() => Promise<typeof import('*.vue')>);

export interface AtFormProps {
  element: AtFormSubSectionOrQuestion;
}
