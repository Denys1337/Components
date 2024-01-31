<template>
  <header class="AtStepperStackHeader d-flex pad-block-02 pad-block-end-04">
    <div class="inline-end-02 block-start-01">
      <Stack2Icon :class="sectionStatus" size="20" class="flex-shrink-0" />
    </div>
    <div class="d-flex flex-column w-100">
      <span class="font-body-default inline-end-04" :title="title">{{ truncatedTitle }}</span>
    </div>
    <div
      class="d-flex ai-center inline-end-02 block-start-01"
      v-if="type === StepType.RepeatableGroup"
    >
      <RepeatIcon class="text-pri-500" size="20" />
    </div>
    <div class="d-flex ai-center">
      <ChevronDownIcon size="20" class="chevron" :class="{ opened }" />
    </div>
  </header>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'AtStepperStackHeader',
  });
</script>
<script lang="ts" setup>
  import { PropType } from 'vue';

  import { RepeatIcon, Stack2Icon, ChevronDownIcon } from 'vue-tabler-icons';

  import {
    STEPPER_STEP_GROUP_MAX_TITLE_LENGTH,
    StepperStep,
    StepType,
  } from '../../at_stepper/types';
  import useTruncatedString from '../../hooks/useTruncate';
  import { useStepperHeader } from '../hooks/useStepperHeader';

  const props = defineProps({
    type: {
      type: String as PropType<StepType>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    steps: {
      type: Array as PropType<StepperStep[]>,
      required: true,
    },
    opened: {
      type: Boolean,
      default: false,
    },
  });

  const { completedSteps, sectionStatus } = useStepperHeader(props.steps);
  const truncatedTitle = useTruncatedString(props.title, STEPPER_STEP_GROUP_MAX_TITLE_LENGTH);
</script>
<style lang="scss" scoped>
  .empty {
    color: var(--gray-800);
  }
  .completed,
  .inprogress {
    color: var(--pri-500);
  }

  .chevron {
    color: var(--gray-700);

    &.opened {
      color: var(--pri-500);
      transform: rotate(180deg);
      transition: transform 200ms ease-in-out;
    }
  }
</style>
