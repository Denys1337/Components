import { AtPopupProps } from '../../../../at_popup/types';
import { SelectorItem } from '../../../../selector_group/types';

export interface AtFormBuilderQuestionType {
  title: string;
  type: AtGroupQuestionsType;
  questionsSubtypes: SelectorItem[];
}
export enum AtGroupQuestionsType {
  Number = 'NUNBER',
  Text = 'TEXT',
  Select = 'SELECT',
}
export interface AtFormBuilderQuestionsPopupProps extends AtPopupProps {
  enableAdvancedEdit?: boolean;
  questionsTypesConfiguration: AtFormBuilderQuestionType[];
  name: string;
  existingFieldIds: string[];
}

export const QUESTION_MAX_LENGTH = 400;
