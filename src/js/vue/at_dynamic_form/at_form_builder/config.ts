import { PencilIcon, TrashIcon, SettingsIcon } from 'vue-tabler-icons';

import { tFunction } from '../../../vue/utils/getTranslators';
import * as AtMenuTypes from '../../at_menu/types';
import { AtQuestionType } from '../types';
import { QuestionMenuListItem } from './components/at_form_builder_question/types';

export const menuQuestionList = (t: tFunction, translationPath: string): QuestionMenuListItem[] => [
  {
    label: t(`${translationPath}.rename_question`),
    name: 'edit-question',
    type: AtMenuTypes.MenuItemTypes.Regular,
    icon: PencilIcon,
  },
  {
    label: t(`${translationPath}.edit_options`),
    name: 'edit-question-options',
    type: AtMenuTypes.MenuItemTypes.Regular,
    icon: SettingsIcon,
    filter: {
      questionType: [AtQuestionType.MultiSelect, AtQuestionType.Select],
    },
  },
  {
    label: t(`${translationPath}.delete_question`),
    name: 'delete-question',
    type: AtMenuTypes.MenuItemTypes.Critical,
    icon: TrashIcon,
  },
];
