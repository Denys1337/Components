import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtEditInlineLable from './AtEditInlineLabel.vue';

export default {
  title: 'Components/AtEditInlineLabel',
  component: AtEditInlineLable,
  decorators: [DefaultDecorator],
};
const AtEditInlineLabelStory: Story = (args) => ({
  name: 'AtEditInlineLabelStory',
  components: { AtEditInlineLable },
  setup() {
    const str = ref('edit me longlonglonglonglonglonglonglonglonglong  longlonglonglonglong');
    return { str, args };
  },
  template: `
    <div style="width: 100%; padding: 50px;">
    <h1>
   <AtEditInlineLable v-model="str" v-bind="args"/> 
      </h1>
    </div>`,
});
export const Default = AtEditInlineLabelStory.bind({});
Default.args = {
  maxPreviewLength: 4,
};
