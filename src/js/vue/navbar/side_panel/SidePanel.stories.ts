import { Story } from '@storybook/vue3';
import { random } from 'faker';
import { CopyrightOffIcon, FolderIcon, IconsIcon } from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import { MenuItem } from '../types';
import SidePanel from './SidePanel.vue';

export default {
  title: 'Navbar/SidePanel',
  component: SidePanel,
  decorators: [DefaultDecorator],
};

const SidePanelStory: Story = (args) => ({
  name: 'SidePanelStory',
  components: { SidePanel },
  setup() {
    return { args };
  },
  template: `
  <div style="width: 100%;">
    <SidePanel v-bind="args" />
  </div>`,
});

export const Default = SidePanelStory.bind({});

const generateMenuItems = (
  menuItemsNum: number,
  children: boolean = true,
  parent: boolean = true
) => {
  const menuItems: MenuItem[] = [];
  for (let menuItemIndex = 0; menuItemIndex < menuItemsNum; menuItemIndex++) {
    menuItems.push({
      name: `${random.words(random.number({ min: 1, max: 6 }))}`,
      link: '#',
      children: children ? generateMenuItems(random.number({ min: 2, max: 6 }), false, false) : [],
      icon: parent ? FolderIcon : IconsIcon,
    });
  }
  return menuItems;
};

Default.args = {
  title: 'Side Panel',
  menuItems: [
    {
      name: `${random.words(random.number({ min: 4, max: 6 }))}`,
      link: '#',
      icon: CopyrightOffIcon,
    },
    ...generateMenuItems(2),
  ],
};
export const CoverScreen = SidePanelStory.bind({});

CoverScreen.args = {
  coverScreen: true,
  title: 'Side Panel cover',
  menuItems: generateMenuItems(random.number({ min: 12, max: 10 }), true),
};
