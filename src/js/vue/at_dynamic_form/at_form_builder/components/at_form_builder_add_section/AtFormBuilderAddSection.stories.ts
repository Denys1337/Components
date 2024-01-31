import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { AtFormBuilderSectionType } from '../../types';
import AtFormBuilderAddSection from './AtFormBuilderAddSection.vue';
import { AtFormBuilderAddSectionProps } from './types';

export default {
  title: 'Form Builder/AtFormBuilderAddSection',
  component: AtFormBuilderAddSection,
  decorators: [DefaultDecorator],
};

const AtFormBuilderAddSectionStory: Story<AtFormBuilderAddSectionProps> = (
  args: AtFormBuilderAddSectionProps
) => ({
  name: 'AtFormBuilderAddSectionStory',
  components: { AtFormBuilderAddSection },
  setup() {
    return { args };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
        <AtFormBuilderAddSection v-bind="args" />
      </div>`,
});

export const Default = AtFormBuilderAddSectionStory.bind({});

Default.args = {
  sections: [
    {
      id: '1',
      title: { en: 'First section long longtitle longtitle longtitle longtitle longtitle' },
      fields: [],
      sectionType: AtFormBuilderSectionType.Normal,
    },
    {
      id: '2',
      title: { en: 'Second section' },
      fields: [],
      sectionType: AtFormBuilderSectionType.Normal,
    },
  ],
};
