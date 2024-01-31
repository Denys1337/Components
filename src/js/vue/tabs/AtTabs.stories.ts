import { h, ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';
import { columns, createData } from '@stories/stories/mock/tables';

import AtTable from '../at_table/AtTable.vue';
import EmptyStateMessage from '../empty_state_message/EmptyStateMessage.vue';
import AtTabs from './AtTabs.vue';
import { AtTabsProps } from './types';

export default {
  title: 'Components/AtTabs',
  component: AtTabs,
  decorators: [DefaultDecorator],
};

const AtTabsStory: Story<AtTabsProps> = (args: AtTabsProps) => ({
  name: 'AtTabsStory',
  components: { AtTabs },
  setup() {
    const selectedIndex = ref(1);
    return { args, selectedIndex };
  },
  template: `  
  <div style="width: 100%; padding: 50px;">
  <AtTabs :configuration="args.configuration" v-model:selectedIndex="selectedIndex"/> 
  </div>`,
});

export const Default = AtTabsStory.bind({});

Default.args = {
  configuration: [
    {
      title: 'First tab',
      //If we need to add slots we can use render functions
      component: h(EmptyStateMessage, null, {
        'image-logo': () =>
          h('img', { src: require('/src/js/vue/empty_state_message/images/search-logo.svg') }),
      }),
      properties: {
        titleI18n: 'Empty State',
        descriptionI18n: 'This is an empty state description',
        showActionButton: true,
        actionTextI18n: 'Button',
      },
    },
    {
      title: 'Second tab',
      component: AtTable,
      properties: { columns, data: createData(100), rowSelection: {}, rowIdProperty: 'id' },
    },
  ],
};
