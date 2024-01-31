import { ref } from 'vue';

import { mockContext } from '../../../../../../test/unit/mocks';
import getTranslators from '../../../utils/getTranslators';
import { AtQuestionType } from '../../types';
import { menuQuestionList } from '../config';
import { QuestionModel } from '../utils';
import useAtFormQuestionWrapperLogic from './useAtFormQuestionWrapperLogic';

describe('test useAtFormQuestionWrapperLogic', () => {
  it('it filters correctly for the options according to the question', () => {
    const { t } = getTranslators();
    const question = ref(QuestionModel('Q1', 'en', '1', AtQuestionType.Boolean));
    const questionMenuItems = ref(menuQuestionList(t, ''));
    const { filteredMenuList } = useAtFormQuestionWrapperLogic(
      question,
      questionMenuItems,
      mockContext
    );
    expect(filteredMenuList.value.length).toBe(2);
    question.value.fieldType = AtQuestionType.MultiSelect;
    expect(filteredMenuList.value.length).toBe(3);
  });
});
