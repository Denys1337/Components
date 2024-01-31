import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtFormNumericQuestion from './AtFormNumericQuestion.vue';

export default {
  title: 'Dynamic Form/AtForm/AtFormNumericQuestion',
  component: AtFormNumericQuestion,
  decorators: [DefaultDecorator],
};

const AtFormNumericQuestionStory: Story = (args) => ({
  name: 'AtFormNumericQuestionStory',
  components: { AtFormNumericQuestion },
  setup() {
    const model = ref();

    function statusChanged(e: any) {
      console.warn('status changed to', e);
    }

    return { args, model, statusChanged };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
        <AtFormNumericQuestion v-bind="args" v-model="model" @status-change="statusChanged($event)"/>
        <div class="block-07">
          value is - {{model}}
        </div>
      </div>`,
});

export const Default = AtFormNumericQuestionStory.bind({});

Default.args = {
  title: 'Question title required with tooltipText',
  value: '',
  id: '3',
  settings: {
    required: true,
  },
  toolTip: {
    en: 'tooltipText',
  },
  questionButtonsDisabled: false,
};
