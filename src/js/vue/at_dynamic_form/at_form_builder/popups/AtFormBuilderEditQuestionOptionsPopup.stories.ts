import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtButton from '../../../at_button/AtButton.vue';
import { AtQuestionType } from '../../types';
import { AtFormBuilderQuestion } from '../types';
import AtFormBuilderEditQuestionOptionsPopup from './AtFormBuilderEditQuestionOptionsPopup.vue';

export default {
  title: 'Form Builder/Components/AtFormBuilderEditQuestionOptionsPopup',
  component: AtFormBuilderEditQuestionOptionsPopup,
  decorators: [DefaultDecorator],
};

const AtFormBuilderEditQuestionOptionsPopupStory: Story = (args) => ({
  name: 'AtFormBuilderEditQuestionOptionsPopupStory',
  components: { AtFormBuilderEditQuestionOptionsPopup, AtButton },
  setup() {
    const show = ref(false);
    const question = ref<AtFormBuilderQuestion>({
      id: '123',
      fieldType: AtQuestionType.ShortText,
      settings: { required: false },
      title: { locale: 'en', value: 'new qustions' },
      options: [
        { label: { en: '0' }, value: '0' },
        { label: { en: '1' }, value: '1' },
        { label: { en: '2' }, value: '2' },
        { label: { en: '3' }, value: '3' },
        { label: { en: '4' }, value: '4' },
        { label: { en: '5' }, value: '5' },
        { label: { en: '6' }, value: '6' },
        { label: { en: '7' }, value: '7' },
        { label: { en: '8' }, value: '8' },
      ],
    });

    return { args, show, question };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtButton @click="show = true">Click to show popup</AtButton>
    <AtFormBuilderEditQuestionOptionsPopup v-model="question" :show="show" @close="show = false" v-bind="args" />
  </div>`,
});

export const Default = AtFormBuilderEditQuestionOptionsPopupStory.bind({});

Default.args = {};
