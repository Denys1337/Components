import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtFormBuilderAdvancedSettings from './AtFormBuilderAdvancedSettings.vue';
import { AtFormBuilderAdvancedSettingsProps } from './types';

export default {
  title: 'Form Builder/Components/AtFormBuilderAdvancedSettings',
  component: AtFormBuilderAdvancedSettings,
  decorators: [DefaultDecorator],
};

const AtFormBuilderAdvancedSettingsStory: Story<AtFormBuilderAdvancedSettingsProps> = (args) => ({
  name: 'AtFormBuilderAdvancedSettingsStory',
  components: { AtFormBuilderAdvancedSettings },
  setup() {
    const id = ref(args.id);
    const error = ref(undefined);

    return { id, error, args };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtFormBuilderAdvancedSettings v-bind="args" v-model:id="id" v-model:error="error" />
    ID is: {{ id }}
    <br>
    Is there error: {{ error }}
  </div>`,
});

export const Default = AtFormBuilderAdvancedSettingsStory.bind({});

Default.args = {
  existingIds: ['1', '2'],
  id: '123',
  error: undefined,
};
