import { ref } from 'vue';

import { Story } from '@storybook/vue3';
import {
  AdjustmentsHorizontalIcon,
  CheckboxIcon,
  CircleDotIcon,
  FileDescriptionIcon,
  HashIcon,
  LayoutAlignMiddleIcon,
  LetterTIcon,
  ToggleLeftIcon,
} from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import getTranslators from '../../utils/getTranslators';
import { AtQuestionType } from '../types';
import AtFormBuilderPage from './AtFormBuilderPage.vue';
import {
  AtFormBuilderQuestionType,
  AtGroupQuestionsType,
} from './popups/at_form_builder_questions_popup/types';

export default {
  title: 'Form Builder/AtFormBuilderPage',
  component: AtFormBuilderPage,
  decorators: [DefaultDecorator],
};

const getQuestionsConfiguration = (): AtFormBuilderQuestionType[] => {
  const { t } = getTranslators();

  return [
    {
      title: t('form_builder.questions_configuration.text.title'),
      type: AtGroupQuestionsType.Text,
      questionsSubtypes: [
        {
          text: t('form_builder.questions_configuration.text.subtype_short_answer'),
          value: AtQuestionType.ShortText,
          icon: LetterTIcon,
        },
        {
          text: t('form_builder.questions_configuration.text.subtype_paragraph'),
          value: AtQuestionType.LongText,
          icon: FileDescriptionIcon,
        },
      ],
    },
    {
      title: t('form_builder.questions_configuration.choice.title'),
      type: AtGroupQuestionsType.Select,
      questionsSubtypes: [
        {
          text: t('form_builder.questions_configuration.choice.subtype_boolean'),
          value: AtQuestionType.Boolean,
          icon: ToggleLeftIcon,
        },
        {
          text: t('form_builder.questions_configuration.choice.subtype_multi_choice'),
          value: AtQuestionType.MultiSelect,
          icon: CheckboxIcon,
        },
        {
          text: t('form_builder.questions_configuration.choice.subtype_single_choice'),
          value: AtQuestionType.Select,
          icon: CircleDotIcon,
        },
      ],
    },
    {
      title: t('form_builder.questions_configuration.number.title'),
      type: AtGroupQuestionsType.Number,
      questionsSubtypes: [
        {
          text: t('form_builder.questions_configuration.number.subtype_numeric'),
          value: AtQuestionType.Number,
          icon: HashIcon,
        },
        {
          text: t('form_builder.questions_configuration.number.subtype_slider'),
          value: AtQuestionType.Slider,
          icon: LayoutAlignMiddleIcon,
          disabled: true,
          subLabel: t('form_builder.questions_configuration.coming_soon'),
        },
        {
          text: t('form_builder.questions_configuration.coming_soon'),
          value: AtQuestionType.RangeSlider,
          icon: AdjustmentsHorizontalIcon,
          disabled: true,
          subLabel: t('form_builder.questions_configuration.coming_soon'),
        },
      ],
    },
  ];
};

const AtFormBuilderPageStory: Story = (args) => ({
  name: 'AtFormBuilderPageStory',
  components: { AtFormBuilderPage },
  setup() {
    const questionsTypesConfiguration = getQuestionsConfiguration();

    const model = ref(args.modelValue);

    return { args, questionsTypesConfiguration, model };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
        <AtFormBuilderPage v-bind="args" :questionsTypesConfiguration="questionsTypesConfiguration" v-model="model" />
      </div>`,
});

export const Default = AtFormBuilderPageStory.bind({});

Default.args = {
  id: '1',
  showSaveButton: true,
  isLoading: false,
  locale: 'en',
  pageTitle: 'title example',
  questionsTypesConfiguration: [],
  modelValue: {
    formDefinition: {
      sections: [],
    },
    imageId: '',
    isPublished: false,
  },
  enableAdvancedEdit: true,
};
