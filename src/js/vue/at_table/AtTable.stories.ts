import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';
import { columns, createData } from '@stories/stories/mock/tables';

import AtTable from './AtTable.vue';
import LinkCell from './cells/LinkCell.vue';
import SubcolumnsCell from './cells/SubcolumnsCell.vue';
import AttentionCell from './cells/badge_cell/AttentionCell.vue';
import BadgeCell from './cells/badge_cell/BadgeCell.vue';
import ThresholdCell from './cells/badge_cell/ThresholdCell.vue';
import ImagesCell from './cells/images_cell/ImagesCell.vue';
import { AtTableProps, AtTableVueProps, ColumnType } from './types';

export default {
  title: 'Table/AtTable',
  component: AtTable,
  decorators: [DefaultDecorator],
  props: AtTableVueProps,
};

const AtTableStory: Story<AtTableProps> = (args) => ({
  name: 'AtTableStory',
  components: { AtTable },
  setup() {
    const rowSelection = ref({});
    return { args, rowSelection };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtTable v-model:rowSelection="rowSelection" v-bind="args" />
  </div>`,
});

export const Default = AtTableStory.bind({});
Default.args = {
  columns,
  data: createData(5),
  rowIdProperty: 'id',
  fitInPage: true,
  isLoading: false,
  cellRenderers: {
    [ColumnType.Boolean]: (value: boolean) => (value ? 'V' : 'X'),
    [ColumnType.Badge]: BadgeCell,
    [ColumnType.Attention]: AttentionCell,
    [ColumnType.Subcolumns]: SubcolumnsCell,
  },
};

export const CustomCellRenderers = AtTableStory.bind({});
export const EmptyTableState = AtTableStory.bind({});

CustomCellRenderers.args = {
  columns,
  data: createData(5),
  cellRenderers: {
    [ColumnType.Boolean]: (value: boolean) => (value ? 'V' : 'X'),
    [ColumnType.Images]: ImagesCell,
    [ColumnType.Attention]: AttentionCell,
    [ColumnType.Link]: LinkCell,
    [ColumnType.Threshold]: ThresholdCell,
    [ColumnType.Badge]: BadgeCell,
  },
  rowSelection: {},
  rowIdProperty: 'id',
  fitInPage: true,
  isLoading: false,
};
EmptyTableState.args = {
  columns,
  data: createData(0),
  emptyStateImage: require('@/vue/empty_state_message/images/search-logo.svg'),
  emptyStateImageAltAttribute: 'empty_state_message.alt_image',
  showEmptyStateButton: true,
};
