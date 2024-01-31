import { ref } from 'vue';

import { Story } from '@storybook/vue3';
import { ChevronDownIcon } from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import { ExampleIconComponent } from './AtMenu.stories';
import AtPositionedMenu from './AtPositionedMenu.vue';
import { AtPositionedMenuProps, MenuItemTypes } from './types';

export default {
  title: 'Components/AtMenu/AtPositionedMenu',
  component: AtPositionedMenu,
  decorators: [DefaultDecorator],
};

const AtPositionedMenuStory: Story<AtPositionedMenuProps> = (args) => ({
  name: 'AtPositionedMenuStory',
  components: { AtPositionedMenu },
  setup() {
    const position = ref({
      x: 527,
      y: 527,
    });
    const changePosition = (e: PointerEvent) => {
      args.show = true;
      position.value = { x: e.clientX, y: e.clientY, height: 1, width: 1 } as DOMRect;
    };
    const clickOutside = () => {
      args.show = false;
    };
    return { args, position, changePosition, clickOutside };
  },
  template: `
  <div style="width: 500px;height: 500px;border:1px dotted black; padding:0;position:relative;" @contextmenu.prevent="changePosition($event)">
  <h3>Right mouse click anywhere inside the dotted box</h3>
    <AtPositionedMenu :position="position" v-bind="args"  @click-outside="clickOutside" />
  </div>`,
});

export const Default = AtPositionedMenuStory.bind({});

Default.args = {
  show: true,

  menuItemList: [
    {
      icon: ExampleIconComponent('icon-tables-add'),
      label: 'test 1',
      name: 'test1',
      type: MenuItemTypes.Regular,
    },
    {
      label: 'no icon',
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
