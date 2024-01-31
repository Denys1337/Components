<template>
  <div
    class="AtStepperStep d-flex pad-inline-06 pad-block-02"
    :class="[step.status, { active: isActive }]"
    @click="$emit('step-click', id)"
  >
    <span
      class="AtStepperStep-status d-block as-center inline-end-02"
      :class="{ 'no-before': !showVerticalLine }"
    ></span>
    <h4 class="font-body-small margin-00" :title="step.title">{{ truncatedTitle }}</h4>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import useTruncatedString from '../../hooks/useTruncate';
  import { STEPPER_STEP_MAX_TITLE_LENGTH, StepperStatus, StepperStep } from '../types';

  export interface AtStepperStepProps {
    title: string;
    status: StepperStatus;
    isActive: boolean;
  }

  export default defineComponent({
    name: 'AtStepperStep',
    components: {},
    props: {
      step: {
        type: Object as PropType<StepperStep>,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
      showVerticalLine: {
        type: Boolean,
        default: true,
      },
    },
    emits: ['step-click'],
    setup(props) {
      const truncatedTitle = useTruncatedString(props.step.title, STEPPER_STEP_MAX_TITLE_LENGTH);

      return { truncatedTitle };
    },
  });
</script>
<style lang="scss">
  .AtStepperStep {
    border-radius: var(--spacing-02);

    &.active {
      background: var(--pri-100);
    }

    &:not(.active):hover {
      background: var(--gray-200);
      cursor: pointer;
    }

    &:last-child {
      .AtStepperStep-status:before {
        content: none;
      }
    }
  }

  .AtStepperStep-status {
    position: relative;
    box-sizing: border-box;
    width: var(--spacing-02);
    height: var(--spacing-02);
    border-radius: 50%;
    border: 2px solid var(--pri-500);
    z-index: 1;

    &:before {
      z-index: 0;
      content: '';
      width: 1px;
      height: var(--spacing-07);
      background: var(--gray-500);
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
    }

    &.no-before:before {
      content: none;
    }

    .completed & {
      background-color: var(--pri-500);
    }

    .inprogress & {
      background-color: white;
    }

    .empty & {
      background-color: grey;
      border-color: grey;
    }
  }
</style>
