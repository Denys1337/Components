<template>
  <header class="AtStepperHeader pad-06">
    <div class="d-flex">
      <img :src="logo" class="image-wrapper inline-end-02 as-center pad-02 border-box" alt="logo" />
      <div class="d-flex jc-space-between w-100">
        <h3 class="AtStepperHeader-title font-body-small-b inline-end-04 margin-00 as-center">
          {{ truncatedTitle }}
        </h3>
        <span class="as-center flex-shrink-0">
          <slot></slot>
        </span>
      </div>
    </div>
    <AtProgressBarLegend :progress="progress" :action-text="actionText" class="block-start-04" />
    <slot name="header-bottom"></slot>
  </header>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import AtProgressBarLegend from '../../at_progress_bar/AtProgressBarLegend.vue';
  import useTruncatedString from '../../hooks/useTruncate';
  import { STEPPER_SECTION_MAX_TITLE_LENGTH, StepperSection, StepperStatus } from '../types';

  export default defineComponent({
    name: 'AtStepperHeader',
    components: {
      AtProgressBarLegend,
    },
    props: {
      logo: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      sections: {
        type: Array as PropType<StepperSection[]>,
        required: true,
      },
      resultText: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const progress = computed(() => (steps.value[0] / steps.value[1]) * 100);
      const actionText = computed(() => `${steps.value[0]}/${steps.value[1]} ${props.resultText}`);
      const truncatedTitle = useTruncatedString(props.title, STEPPER_SECTION_MAX_TITLE_LENGTH);

      const steps = computed(() => {
        return props.sections.reduce(
          ([completed, total], item) => {
            const completedStepsForSection = item.steps.filter(
              (step) => step.status === StepperStatus.Completed
            );
            return [completed + completedStepsForSection.length, total + item.steps.length];
          },
          [0, 0]
        );
      });

      return {
        props,
        progress,
        actionText,
        truncatedTitle,
      };
    },
  });
</script>
<style lang="scss">
  $logoImageSize: 48px;

  .AtStepperHeader {
    border-bottom: 1px solid var(--gray-400);

    .image-wrapper {
      border-radius: 50%;
      border: 2px solid var(--gray-400);

      width: $logoImageSize;
      height: $logoImageSize;

      img {
        max-width: 100%;
        height: auto;
      }
    }
  }
</style>
