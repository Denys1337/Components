import { Story } from '@storybook/vue3';
import { MapIcon, LinkIcon } from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import MenuItemList from './MenuItemList.vue';
import { MenuItem } from './types';

interface MenuItemListProps {
  items: MenuItem[];
  mini: boolean;
}

const items: MenuItem[] = [
  {
    name: 'map',
    icon: MapIcon,
    route: { to: { name: 'my-route-name' } },
    current: true,
  },
  { name: 'google', icon: LinkIcon, link: 'http://www.google.com' },
];

export default {
  title: 'Layout/MenuItemList',
  component: MenuItemList,
  decorators: [DefaultDecorator],
  argTypes: {
    items: '',
    mini: { control: { type: 'boolean' } },
  },
};

const MenuItemListStory: Story<MenuItemListProps> = (args) => ({
  name: 'MenuItemListStory',
  components: { MenuItemList },
  setup() {
    return {
      args,
    };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <MenuItemList v-bind="args" />
  </div>`,
});

export const Default = MenuItemListStory.bind({});

Default.args = {
  items,
  mini: false,
};
