import { MenuItem } from '../../../../at_menu/types';
import { AtQuestionType } from '../../../types';

interface Filter {
  questionType: AtQuestionType[];
}

export interface QuestionMenuListItem extends MenuItem {
  filter?: Filter;
}
