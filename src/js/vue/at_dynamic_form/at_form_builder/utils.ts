import { AtQuestionType } from '../types';
import { AtFormBuilderQuestion } from './types';

export const QuestionModel = (
  title: string,
  locale: string,
  id: string,
  fieldType: AtQuestionType
): AtFormBuilderQuestion => ({
  title: {
    [locale]: title,
  },
  settings: {
    required: true,
    editable: true,
    placeholder: {
      [locale]: title,
    },
  },
  toolTip: {
    [locale]: '',
  },
  id,
  fieldType,
});

export const filterMap = (currentId: string, existingElementsIds: Map<string, any>) =>
  new Map([...existingElementsIds].filter(([id]) => id !== currentId));
