import { computed, ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtProgressBarLegend from './AtProgressBarLegend.vue';
import { AtProgressBarLegendProps, ProgressBarSize, ProgressBarTextPosition } from './types';

export default {
    title: 'Components/AtProgressBar/AtProgressBarLegend',
    component: AtProgressBarLegend,
    decorators: [DefaultDecorator],
    argTypes: {
        size: {
            control: {
        options: Object.values(ProgressBarSize),
        type: 'select',
      },
    },
    textPosition: {
      control: {
        options: Object.values(ProgressBarTextPosition),
        type: 'select',
      },
    },
  },
};

const AtProgressBarLegendStory: Story<AtProgressBarLegendProps> = (
  args: AtProgressBarLegendProps
) => ({
  name: 'AtProgressBarLegendStory',
  components: { AtProgressBarLegend },
  setup() {
    const progress = ref(0);
    const resultText = computed(() => `${args.resultText} ${progress.value}%`);

    setInterval(() => {
      progress.value = Math.floor(Math.random() * (100 + 1));
    }, 2500);

    return { args, progress, resultText };
  },
  template: `
      <div style="width: 50%;margin:0 auto; padding: 50px;">
        <AtProgressBarLegend v-bind="args" :progress="progress" :result-text="resultText"/>
      </div>`,
});

export const Default = AtProgressBarLegendStory.bind({});

Default.args = {
  progress: 22,
  actionText: 'Downloading...',
  resultText: 'result',
  size: ProgressBarSize.Big,
};
