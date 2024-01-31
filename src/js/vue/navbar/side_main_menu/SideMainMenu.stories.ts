import { Story } from '@storybook/vue3';
import { TableIcon } from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import { newNavItems } from '../../../../../.storybook/stories/mock/navbar';
import { LogoData, MenuItem } from '../types';
import SideMainMenu from './SideMainMenu.vue';

export default {
  title: 'Navbar/SideMainMenu',
  component: SideMainMenu,
  decorators: [DefaultDecorator],
};

const SideMainMenuStory: Story = (args) => ({
  name: 'SideMainMenuStory',
  components: { SideMainMenu },
  setup() {
    args.menuItems = args.menuItems.map(convertIcons);
    return { args };
  },
  template: `
  <div style="width: 100%; background:var(--gray-200);">
    <SideMainMenu v-bind="args" />
  </div>`,
});

const convertIcons = (menuItem: MenuItem): MenuItem => ({
  ...menuItem,
  icon: menuItem.icon ? TableIcon : '',
  children: menuItem.children?.length ? menuItem.children.map(convertIcons) : [],
});

export const Default = SideMainMenuStory.bind({});

const logoData: LogoData = {
  clientLogoUrl: 'https://www.pngmart.com/files/22/Lego-Logo-PNG-File.png',
  clientIconUrl: 'https://cdn-icons-png.flaticon.com/512/588/588323.png',
  defaultIconUrl: '',
  defaultLogoUrl: '',
};
Default.args = {
  userInfo: { firstName: 'Timur', lastName: 'Krasner', role: 'my role' },
  logoData,
  menuItems: newNavItems,
};
