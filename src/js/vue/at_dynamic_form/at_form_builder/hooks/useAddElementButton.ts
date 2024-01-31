import { computed, ref } from 'vue';

import { MenuItemList, MenuItemTypes } from '../../../at_menu/types';
import getTranslators from '../../../utils/getTranslators';
import { PossibleQuestionTypes } from '../types';

export function useAddElementButton(translationPath: string) {
  const { t } = getTranslators();

  const elementToAdd = ref<PossibleQuestionTypes>(PossibleQuestionTypes.Question);

  const setElementToAdd = (value: PossibleQuestionTypes) => {
    elementToAdd.value = value;
  };

  const questionTypes: MenuItemList = [
    {
      name: PossibleQuestionTypes.Question,
      label: t(`${translationPath}.question_types.${PossibleQuestionTypes.Question}`),
      type: MenuItemTypes.Regular,
    },
    {
      name: PossibleQuestionTypes.Stack,
      label: t(`${translationPath}.question_types.${PossibleQuestionTypes.Stack}`),
      type: MenuItemTypes.Regular,
    },
  ];

  const buttonText = computed(() => t(`${translationPath}.add_${elementToAdd.value}_title`));

  return {
    questionTypes,
    elementToAdd,
    setElementToAdd,
    buttonText,
  };
}
