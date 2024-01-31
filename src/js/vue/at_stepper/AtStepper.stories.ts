import { Story } from '@storybook/vue3';
import { InfoCircleIcon } from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import AtButton from '../at_button/AtButton.vue';
import AtStepper from './AtStepper.vue';
import { AtStepperProps, StepperSection, StepType, StepperStatus } from './types';

const sections: StepperSection[] = [
  {
    title: 'Completed section title',
    steps: [
      {
        status: StepperStatus.Completed,
        title: 'in progress step title',
        id: '1',
        type: StepType.Regular,
      },
    ],
  },
  {
    title: 'InProgress section title',
    steps: [
      {
        status: StepperStatus.Completed,
        title: 'completed step title',
        id: '2',
        type: StepType.Regular,
      },
      {
        status: StepperStatus.InProgress,
        title: 'in progress step title',
        id: '3',
        type: StepType.Regular,
      },
      {
        status: StepperStatus.Empty,
        title: 'empty step title',
        id: '4',
        type: StepType.Regular,
      },
    ],
  },
  {
    title: 'test section title with very very long title ',
    steps: [
      {
        status: StepperStatus.Empty,
        title: 'empty step title with very very long title ',
        id: '5',
        type: StepType.Regular,
      },
      {
        status: StepperStatus.Empty,
        title: 'empty step title',
        id: '6',
        type: StepType.Regular,
      },
    ],
  },
  {
    title: 'test stack section',
    steps: [
      {
        status: StepperStatus.Empty,
        title: 'empty step title with very very long title ',
        id: '7',
        type: StepType.Group,
        stepGroups: [
          [
            {
              status: StepperStatus.Empty,
              title: 'step of stack 1',
              id: '7-1',
              type: StepType.Regular,
            },
            {
              status: StepperStatus.Empty,
              title: 'step of stack 2',
              id: '7-2',
              type: StepType.Regular,
            },
          ],
        ],
      },
      {
        status: StepperStatus.Empty,
        title: 'empty step title',
        id: '8',
        type: StepType.Group,
        stepGroups: [],
      },
    ],
  },
  {
    title: 'test stack repeatable section',
    steps: [
      {
        status: StepperStatus.Empty,
        title: 'empty step title with very very long title ',
        id: '9',
        type: StepType.RepeatableGroup,
        stepGroups: [
          [
            {
              status: StepperStatus.Empty,
              title: 'step of stack 1',
              id: '9-1',
              type: StepType.Regular,
            },
            {
              status: StepperStatus.Empty,
              title: 'step of stack 2',
              id: '9-2',
              type: StepType.Regular,
            },
          ],
          [
            {
              status: StepperStatus.Empty,
              title: 'step of stack 1',
              id: '9-1-1',
              type: StepType.Regular,
            },
            {
              status: StepperStatus.Empty,
              title: 'step of stack 2',
              id: '9-2-2',
              type: StepType.Regular,
            },
          ],
        ],
      },
      {
        status: StepperStatus.Completed,
        title: 'empty step title',
        id: '10',
        type: StepType.RepeatableGroup,
        stepGroups: [],
      },
    ],
  },
];
export default {
  title: 'Components/AtStepper',
  component: AtStepper,
  decorators: [DefaultDecorator],
};
const AtStepperStory: Story<AtStepperProps> = (args) => ({
  name: 'AtStepperStory',
  components: { AtStepper, InfoCircleIcon },
  setup() {
    const handleStepClick = (newStepId: string) => {
      console.warn(`going to change step id to ${newStepId}`);
    };

    return { args, handleStepClick };
  },
  template: `
      <div style="width: 100%; padding: 0 50px;">
      <AtStepper v-bind="args" @step-click="handleStepClick">
        <span style="color:var(--pri-500)"><InfoCircleIcon size="24" class="inline-end-0 as-center"/> </span>
      </AtStepper>
      </div>`,
});

export const Default = AtStepperStory.bind({});

Default.args = {
  activeStepId: '2',
  sections,
  logo: 'https://start.agritask.com/wp-content/uploads/2020/06/fav.png',
  title: 'Agritask certificate Long string Long string Long string Long string ',
  resultText: 'steps completed',
  showExitIcon: true,
  exitText: 'Exit',
};
const AtStepperWithSlotsStory: Story<AtStepperProps> = (args) => ({
  name: 'AtStepperWithSlotsStory',
  components: { AtStepper, AtButton },
  setup() {
    const handleStepClick = (newStepId: string) => {
      console.warn(`going to change step id to ${newStepId}`);
    };

    return { args, handleStepClick };
  },
  template: `
      <div style="width: 100%; padding: 0 50px;">
      <AtStepper v-bind="args" @step-click="handleStepClick">
      <template #rightBottom><span>Span </span></template>
      <template #leftBottom><AtButton size='m' mood='danger'>Delete</AtButton></template>
      </AtStepper>
      </div>`,
});
export const WithSlots = AtStepperWithSlotsStory.bind({});
WithSlots.args = {
  title: 'with slots',
  sections,
  logo: 'https://start.agritask.com/wp-content/uploads/2020/06/fav.png',
  exitText: 'Save changes',
  showExitIcon: false,
};
