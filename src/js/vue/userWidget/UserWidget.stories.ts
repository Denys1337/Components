import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import UserWidget from './UserWidget.vue';

interface UserWidgetProps {
  name: string;
  firstName?: string;
  lastName?: string;
  role: string;
  mini: boolean;
}

export default {
  title: 'Layout/UserWidget',
  component: UserWidget,
  decorators: [DefaultDecorator],
  argTypes: {
    name: '',
    role: '',
    mini: { control: { type: 'boolean' } },
  },
};

const UserWidgetStory: Story<UserWidgetProps> = (args) => ({
  name: 'UserWidgetStory',
  components: { UserWidget },
  setup() {
    const onLogout = () => alert('logout');
    return {
      args,
      onLogout,
    };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <UserWidget v-bind="args" @logout="onLogout" />
  </div>`,
});

export const Default = UserWidgetStory.bind({});

Default.args = {
  // name: 'my name',
  firstName: 'Timur',
  lastName: 'Krasner',
  role: 'my role',
  mini: false,
};
