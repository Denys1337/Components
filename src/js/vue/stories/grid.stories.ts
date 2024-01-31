import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtCard from '../at_card/AtCard.vue';

export default {
  title: 'Style/Grid',
  component: { AtCard },
  decorators: [DefaultDecorator],
};

// grid
const GridStory: Story = () => ({
  name: 'Grid',
  components: { AtCard },
  template: `
  <div class="d-flex flex-column">
    <div class="block-end-02">There are three breakpoints lg, md and sm (as saved in _vars.scss)</div>
      <div class="at-grid" style="height:600px; width:800px; grid-auto-rows:1fr;">
          <AtCard clickable default-add-card class="at-col-lg-4 at-col-sm-12 at-col-md-6" clickable-card-text="Add new"></AtCard>
          <AtCard default-add-card clickable class="at-col-lg-4 at-col-sm-12 at-col-md-6" clickable-card-text="Add new"></AtCard>
          <AtCard default-add-card clickable class="at-col-lg-4 at-col-sm-12 at-col-md-6" clickable-card-text="Add new"></AtCard>
          <AtCard default-add-card clickable class="at-col-lg-4 at-col-sm-12 at-col-md-6" clickable-card-text="Add new"></AtCard>
      </div>
  </div>`,
});
export const Grid = GridStory.bind({});
