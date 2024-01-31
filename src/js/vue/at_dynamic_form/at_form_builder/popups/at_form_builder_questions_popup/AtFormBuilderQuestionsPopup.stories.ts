import { ref } from 'vue';

import { Story } from '@storybook/vue3';
import {
  AdjustmentsHorizontalIcon,
  CheckboxIcon,
  FileDescriptionIcon,
  HashIcon,
  HazeIcon,
  InfoCircleIcon,
  LetterTIcon,
  ToggleLeftIcon,
} from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import AtButton from '../../../../at_button/AtButton.vue';
import { Appearance, Size } from '../../../../at_popup/types';
import { AtQuestionType } from '../../../types';
import { AtFormBuilderQuestion } from '../../types';
import AtFormBuilderQuestionsPopup from './AtFormBuilderQuestionsPopup.vue';
import { AtFormBuilderQuestionsPopupProps, AtGroupQuestionsType } from './types';

export default {
  title: 'Form Builder/AtFormBuilderQuestionsPopup',
  component: AtFormBuilderQuestionsPopup,
  decorators: [DefaultDecorator],
  argTypes: {
    appearance: {
      control: {
        type: 'select',
        options: Object.values(Appearance),
      },
    },
    currentSize: {
      control: {
        type: 'select',
        options: Object.values(Size),
      },
    },
  },
};

const AtFormBuilderQuestionsPopupStory: Story<AtFormBuilderQuestionsPopupProps> = (
  args: AtFormBuilderQuestionsPopupProps
) => ({
  name: 'AtFormBuilderQuestionsPopupStory',
  components: { AtFormBuilderQuestionsPopup, AtButton },
  setup() {
    const show = ref(false);
    const question = ref<AtFormBuilderQuestion>({
      id: '123',
      fieldType: AtQuestionType.ShortText,
      settings: { required: false },
      title: { locale: 'en', value: 'new qustions' },
    });
    return { args, Appearance, Size, show, question };
  },
  template: `
    <div style="width: 100%; padding: 50px;">
    <AtButton @click="show = true">Click to show popup</AtButton>
    <AtFormBuilderQuestionsPopup :question-to-edit="question" :show="show" @close="show = false" v-bind="args"/>
    </div>`,
});

export const Default = AtFormBuilderQuestionsPopupStory.bind({});

Default.args = {
  appearance: Appearance.Regular,
  confirmText: 'Add',
  cancelText: 'Cancel',
  name: 'QuestionPopup',
  disableClickAway: true,
  titleText: 'Add question',
  showCloseIcon: true,
  showConfirmationButtons: true,
  showDividerLine: false,
  existingFieldIds: ['1', '2'],
  enableAdvancedEdit: true,
  questionsTypesConfiguration: [
    {
      title: 'Text',
      type: AtGroupQuestionsType.Text,
      questionsSubtypes: [
        {
          text: 'Short answer',
          value: 'shortAnswer',
          icon: LetterTIcon,
          translate: false,
        },
        {
          text: 'Paragraph',
          value: 'paragraph',
          icon: FileDescriptionIcon,
          translate: false,
        },
      ],
    },
    {
      title: 'Choice',
      type: AtGroupQuestionsType.Select,

      questionsSubtypes: [
        {
          text: 'Yes/no',
          value: 'boolean',
          icon: ToggleLeftIcon,
          translate: false,
        },
        {
          text: 'Multi Choice',
          value: 'multipleChoice',
          icon: CheckboxIcon,
          translate: false,
        },
        {
          text: 'Single Choice',
          value: 'singleChoice',
          icon: InfoCircleIcon,
          translate: false,
        },
      ],
    },
    {
      title: 'Numbers',
      type: AtGroupQuestionsType.Number,
      questionsSubtypes: [
        { text: 'Numeric', value: 'numeric', icon: HashIcon, translate: false },
        {
          text: 'Slider',
          value: 'slider',
          icon: AdjustmentsHorizontalIcon,
          translate: false,
        },
        {
          text: 'Range Slider',
          value: 'rangeSlider',
          icon: HazeIcon,
          translate: false,
        },
      ],
    },
  ],
};
