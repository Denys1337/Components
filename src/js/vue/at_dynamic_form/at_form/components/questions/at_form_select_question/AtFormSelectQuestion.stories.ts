import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtFormSelectQuestion from './AtFormSelectQuestion.vue';

export default {
  title: 'Dynamic Form/AtForm/AtFormSelectQuestion',
  component: AtFormSelectQuestion,
  decorators: [DefaultDecorator],
};

const AtFormSelectQuestionStory: Story = (args) => ({
  name: 'AtFormSelectQuestionStory',
  components: { AtFormSelectQuestion },
  setup() {
    const model = ref();

    function statusChanged(e: any) {
      console.warn('status changed to', e);
    }

    return { args, model, statusChanged };
  },
  template: `
    <div style="width: 100%; padding: 50px;">
    <AtFormSelectQuestion v-bind="args" v-model="model" @status-change="statusChanged($event)"/>
    <div class="block-07">
      value is - {{model}}
    </div>
    </div>`,
});

export const Default = AtFormSelectQuestionStory.bind({});

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
  options: [
    { value: '0', text: 'option 0' },
    { value: '1', text: 'option 1' },
    { value: '2', text: 'option 2' },
    { value: '3', text: 'option 3' },
  ],
};
