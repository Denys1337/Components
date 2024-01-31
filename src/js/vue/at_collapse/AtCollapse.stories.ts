import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import AtCollapse from './AtCollapse.vue';

export default {
  title: 'Components/AtCollapse',
  component: AtCollapse,
};

const AtInputStory: Story = (args) => ({
  name: 'AtColapseStory',
  components: { AtCollapse },
  setup() {
    const collapsed = ref(true);
    return { args, collapsed };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtCollapse :button-label="'click me'" v-model:collapsed="collapsed" v-bind="args" >
    <h1>Should be hidden</h1>
    </AtCollapse>
  </div>
  `,
});

export const Default = AtInputStory.bind({});

Default.args = {};
