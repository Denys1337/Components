import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtFormUnitNumericQuestion from './AtFormUnitNumericQuestion.vue';

export default {
  title: 'Dynamic Form/AtForm/AtFormUnitNumericQuestion',
  component: AtFormUnitNumericQuestion,
  decorators: [DefaultDecorator],
};

const AtFormUnitNumericQuestionStory: Story = (args) => ({
  name: 'AtFormUnitNumericQuestionStory',
  components: { AtFormUnitNumericQuestion },
  setup() {
    const model = ref();

    function statusChanged(e: any) {
      console.warn('status changed to', e);
    }

    return { args, model, statusChanged };
  },
  template: `
    <div style="width: 100%; padding: 50px;">
    <AtFormUnitNumericQuestion v-bind="args" v-model="model" @status-change="statusChanged($event)"/>
    <div class="block-07">
      value is - {{model}}
    </div>
    </div>`,
});

export const Default = AtFormUnitNumericQuestionStory.bind({});

Default.args = {
  title: 'Question title required with tooltipText',
  value: '',
  id: '3',
  options: [
    { label: 'option1', value: 'OPTION1' },
    { label: 'option2', value: 'OPTION2' },
  ],
  toolTip: {
    en: 'tooltipText',
  },
  questionHierarchyText: '1.1',
  questionButtonsDisabled: false,
};
