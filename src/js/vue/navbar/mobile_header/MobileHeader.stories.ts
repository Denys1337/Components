import { Story } from '@storybook/vue3';
import { BellIcon } from 'vue-tabler-icons';

import { LogoData } from '../types';
import MobileHeader from './MobileHeader.vue';

export default {
  title: 'Layout/MobileHeader',
  component: MobileHeader,
  decorators: [],
  argTypes: {
    items: '',
    mini: { control: { type: 'boolean' } },
  },
};
const logoData: LogoData = {
  clientLogoUrl: 'https://www.pngmart.com/files/22/Lego-Logo-PNG-File.png',
  clientIconUrl: 'https://cdn-icons-png.flaticon.com/512/588/588323.png',
  defaultIconUrl: '',
  defaultLogoUrl: '',
};

const MobileHeaderStory: Story = (args) => ({
  name: 'MobileHeaderStory',
  components: { MobileHeader },
  setup() {
    return {
      args,
    };
  },
  template: `
  <div style="width: 100%; padding: 50px; position: relative;background-color:gray;height:100%;">
    <MobileHeader v-bind="args" />
  </div>`,
});

export const Default = MobileHeaderStory.bind({});

Default.args = {
  logoData,
  endMenuItem: {
    icon: BellIcon,
  },
};
