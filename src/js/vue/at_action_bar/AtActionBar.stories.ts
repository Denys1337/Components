import { Story } from '@storybook/vue3';
import { VectorTriangleIcon } from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import { MenuItem } from '../at_menu/types';
import { FieldType } from '../dynamic_field/types';
import AtActionBar from './AtActionBar.vue';
import { AtActionBarProps, ButtonAction, FieldAction } from './types';

export default {
  title: 'Components/AtActionBar',
  component: AtActionBar,
  decorators: [DefaultDecorator],
};

const AtActionBarStory: Story<AtActionBarProps> = (args) => ({
  name: 'AtActionBarStory',
  components: { AtActionBar },
  setup() {
    // eslint-disable-next-line no-console
    const clickHandler = console.log;
    // eslint-disable-next-line no-console
    const inputHandler = console.log;

    return { args, clickHandler, inputHandler };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtActionBar @menu-item-click="clickHandler" @menu-item-input="inputHandler" v-bind="args" />
  </div>`,
});

export const Default = AtActionBarStory.bind({});

Default.args = {
  startActions: [
    {
      actionType: 'button',
      label: 'start first',
      name: '1',
      actionStartIcon: VectorTriangleIcon,
    } as ButtonAction,
    {
      actionType: 'field',
      label: 'First field',
      name: 'field',
      menuItemProps: { type: FieldType.NumberField, value: '1' },
    } as FieldAction,
  ],
  endActions: [
    {
      actionType: 'button',
      label: 'end first',
      name: '2',
      menuItemProps: { visual: 'primary' },
    } as ButtonAction,
  ],
  menuActions: [{ label: 'menuItem', name: 'first', type: 'regular' } as MenuItem],
};
