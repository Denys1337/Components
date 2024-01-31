import { Story } from '@storybook/vue3';
import { ChevronDownIcon, DotsVerticalIcon } from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import AtMenu from './AtMenu.vue';
import { AtMenuProps, MenuItem, MenuItemTypes } from './types';

export default {
  title: 'Components/AtMenu',
  component: AtMenu,
  decorators: [DefaultDecorator],
};

const AtMenuStory: Story<AtMenuProps> = (args) => ({
  name: 'AtMenuStory',
  components: { AtMenu, DotsVerticalIcon },
  setup() {
    const menuItemClick = (item: MenuItem) => {
      // eslint-disable-next-line no-console
      console.log(item.label);
    };
    return { args, menuItemClick };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
      <AtMenu v-bind="args" @menu-item-click="menuItemClick">
        Click on icon  <DotsVerticalIcon size="16"></DotsVerticalIcon>
      </AtMenu>
      </div>`,
});

export const Default = AtMenuStory.bind({});

export const ExampleIconComponent = (className: string) => ({
  name: 'ExampleIconComponent',
  setup() {
    return { className };
  },
  template: `
      <i
          class="icon" :class="className"
      ></i>
    `,
});

Default.args = {
  menuItemList: [
    {
      icon: ExampleIconComponent('icon-tables-add'),
      label: 'test 1',
      name: 'test1',
      menuItemProps: {
        href: './',
      },
      type: MenuItemTypes.Regular,
    },
    {
      label: 'no icon',
      disabled: true,
      name: 'test_no_icon',
      type: MenuItemTypes.Regular,
    },
    {
      title: 'test group',
      groupItems: [
        {
          icon: ChevronDownIcon,
          label: 'test2',
          name: 'test2',
          type: MenuItemTypes.Regular,
        },
        {
          icon: ExampleIconComponent('icon-tables-copy'),
          label: 'test3',
          name: 'test3',
          type: MenuItemTypes.Regular,
        },
      ],
    },

    {
      icon: ExampleIconComponent('icon-tables-delete'),
      label: 'test4',
      name: 'test4',
      type: MenuItemTypes.Critical,
    },
  ],
};
