import { getUnitNumericQuestionDefaultValue } from '../at_form_builder/components/at_form_builder_numeric_unit_question/types';
import { UnitGroupOptionsModel } from '../at_form_builder/popups/at_form_builder_unit_popup/types';
import { AtQuestionType, FieldValue, UnitNumericModelValue } from '../types';
import { AtFormQuestion } from './types';

export const getDefaultFieldValue = (
  currentField: AtFormQuestion
): string | UnitNumericModelValue => {
  switch (currentField.fieldType) {
    case AtQuestionType.UnitNumeric:
      return getUnitNumericQuestionDefaultValue(currentField);
    default:
      return '';
  }
};

export const getStackDefaultValues = (fields: AtFormQuestion[]) => {
  return fields.reduce((acc, field) => {
    acc[field.id as keyof typeof acc] = getDefaultFieldValue(field);
    return acc;
  }, {} as Record<string, FieldValue>);
};

export function getUnitTranslation(
  unitGroups: UnitGroupOptionsModel[],
  unitKey: string,
  locale = 'en'
): string {
  for (const key of Object.keys(unitGroups)) {
    const optionValueInGroup = (
      unitGroups[key as keyof typeof unitGroups] as UnitGroupOptionsModel
    ).options.find((option) => option.value === unitKey);

    if (optionValueInGroup) {
      return optionValueInGroup.label[locale] || unitKey;
    }
  }

  return unitKey;
}
