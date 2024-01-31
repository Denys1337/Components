import { InputSelectModelValue } from '../../../../at_input_select/types';
import { OptionGroup, Option } from '../../../../at_select/types';
import { UnitNumericModelValue } from '../../../types';
import { AtFormBuilderQuestion } from '../../types';

export interface AtFormBuilderNumericUnitQuestionProps extends AtFormBuilderQuestion {
  unitOptionGroups: OptionGroup[];
}

export const getUnitNumericQuestionDefaultValue = (field: {
  options: Option[];
}): UnitNumericModelValue => ({
  inputValue: '',
  valueType: field.options?.length ? field.options[0].value : '',
});

export const getAtFormBuilderNumericUnitQuestionDefaultValue = (field: {
  options: Option[];
}): InputSelectModelValue => ({
  inputValue: '',
  selectValue: field.options?.length ? field.options[0].value : '',
});

export const convertAtUnitNumericToInputSelect = (
  value: UnitNumericModelValue
): InputSelectModelValue => ({
  inputValue: value.inputValue,
  selectValue: value.valueType,
});

export const convertInputSelectValueToAtUnitNumeric = (
  value: InputSelectModelValue
): UnitNumericModelValue => ({
  inputValue: value.inputValue,
  valueType: value.selectValue,
});
