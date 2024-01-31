import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtPagination from './AtPagination.vue';
import { AtPaginationProps, DEFAULT_ITEMS_PER_PAGE_OPTIONS, DEFAULT_ITEMS_PER_PAGE } from './types';

export default {
  title: 'Table/AtPagination',
  component: AtPagination,
  decorators: [DefaultDecorator],
};

const AtPaginationStory: Story<AtPaginationProps> = (args) => ({
  name: 'AtPaginationStory',
  components: { AtPagination },
  setup() {
    return { args };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtPagination v-bind="args" />
  </div>
  `,
});

export const Default = AtPaginationStory.bind({});

Default.args = {
  totalItems: 1000,
  selectedRowsCount: 0,
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  itemsPerPageOptions: DEFAULT_ITEMS_PER_PAGE_OPTIONS,
  showPrevNextButtons: true,
  showFirstLastButtons: true,
  startingPage: 0,
  currentPage: 0,
};
