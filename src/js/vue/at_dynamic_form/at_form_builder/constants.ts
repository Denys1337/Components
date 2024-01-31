import { AtQuestionType, AtQuestionTypeComponentMap } from '../types';
import AtFormBuilderBooleanQuestion from './components/at_form_builder_boolean_question/AtFormBuilderBooleanQuestion.vue';
import AtFormBuilderLongText from './components/at_form_builder_long_text/AtFormBuilderLongText.vue';
import AtFormBuilderNumericQuestion from './components/at_form_builder_numberic_question/AtFormBuilderNumericQuestion.vue';
import AtFormBuilderNumericUnitQuestion from './components/at_form_builder_numeric_unit_question/AtFormBuilderNumericUnitQuestion.vue';
import AtFormBuilderSelect from './components/at_form_builder_select/AtFormBuilderSelect.vue';
import AtFormBuilderShortText from './components/at_form_builder_short_text/AtFormBuilderShortText.vue';

export const defaultAtFormBuilderTypeComponentMap: AtQuestionTypeComponentMap = {
  [AtQuestionType.Boolean]: AtFormBuilderBooleanQuestion,
  [AtQuestionType.ShortText]: AtFormBuilderShortText,
  [AtQuestionType.LongText]: AtFormBuilderLongText,
  [AtQuestionType.Select]: AtFormBuilderSelect,
  [AtQuestionType.MultiSelect]: AtFormBuilderSelect,
  [AtQuestionType.Number]: AtFormBuilderNumericQuestion,
  [AtQuestionType.Slider]: AtFormBuilderBooleanQuestion,
  [AtQuestionType.RangeSlider]: AtFormBuilderBooleanQuestion,
  [AtQuestionType.UnitNumeric]: AtFormBuilderNumericUnitQuestion,
};
