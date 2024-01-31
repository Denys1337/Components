import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtFormBooleanQuestion from './AtFormBooleanQuestion.vue';

export default {
  title: 'Dynamic Form/AtForm/AtFormBooleanQuestion',
  component: AtFormBooleanQuestion,
  decorators: [DefaultDecorator],
};

const AtFormBooleanQuestionStory: Story = (args) => ({
  name: 'AtFormBooleanQuestionStory',
  components: { AtFormBooleanQuestion },
  setup() {
    const model = ref();

    function statusChanged(e: any) {
      console.warn('status changed to', e);
    }

    return { args, model, statusChanged };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
        <AtFormBooleanQuestion v-bind="args" v-model="model" @status-change="statusChanged($event)"/>
        <div class="block-07">
          value is - {{model}}
        </div>
      </div>`,
});

export const Default = AtFormBooleanQuestionStory.bind({});

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
  questionHierarchyText: '1.1',
  questionButtonsDisabled: false,
  popupButtonsDisabled: false,
};
