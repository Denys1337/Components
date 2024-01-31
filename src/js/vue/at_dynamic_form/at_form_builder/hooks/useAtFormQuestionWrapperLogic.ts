import { computed, inject, SetupContext, Ref, PropType } from 'vue';

import { Locales } from '../../../at_translations/types';
import { getTranslatedText } from '../../../utils/getTranslatedText';
import { QuestionMenuListItem } from '../components/at_form_builder_question/types';
import { AtFormBuilderQuestion } from '../types';

export const emits = [
  'update:modelValue',
  'rename-question',
  'edit-question',
  'delete-question',
  'edit-question-options',
];

export const props = {
  questionMenuList: {
    type: Array as PropType<QuestionMenuListItem[]>,
    default: () => [],
  },
  question: {
    type: Object as PropType<AtFormBuilderQuestion>,
    required: true,
  },
};

export default function useAtFormQuestionWrapperLogic(
  question: Ref<AtFormBuilderQuestion>,
  questionMenuList: Ref<QuestionMenuListItem[]>,
  context: SetupContext<string[]>
) {
  const locale = inject('language', 'en') as Locales;

  const questionModel = computed({
    get: () => question.value,
    set: (value) => {
      context.emit('update:modelValue', value);
    },
  });

  const titleModel = computed({
    get: () => getTranslatedText(questionModel.value.title, locale),
    set: (value) => {
      if (titleModel.value !== value) {
        context.emit('rename-question', value);
      }
    },
  });

  const filteredMenuList = computed(() =>
    questionMenuList.value.filter((menuOption) => {
      if (!menuOption.filter) return true;
      if ('questionType' in menuOption.filter) {
        const includedQuestionTypes = new Set(menuOption.filter.questionType);
        return includedQuestionTypes.has(question.value.fieldType);
      }
      return true;
    })
  );

  return {
    questionModel,
    locale,
    titleModel,
    filteredMenuList,
  };
}
