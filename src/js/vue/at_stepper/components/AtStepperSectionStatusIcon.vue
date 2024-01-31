<template>
  <span class="AtStepperSectionStatusIcon flex-shrink-0 as-start" :class="status">
    <PieChartIcon v-if="status === StepperStatus.InProgress" :progress="progress" :size="size" />
    <i class="AtStepperSectionStatusIcon-simple d-flex border-box" v-else :style="iconStyles">
      <CheckIcon :size="checkIconSize" class="check-icon" stroke-width="4" />
    </i>
  </span>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import { CheckIcon } from 'vue-tabler-icons';

  import PieChartIcon from '../../icons/PieChartIcon.vue';
  import { StepperStatus } from '../types';

  export default defineComponent({
    name: 'AtStepperSectionStatusIcon',
    components: { PieChartIcon, CheckIcon },
    props: {
      progress: { type: Number, required: true },
      size: { type: Number, default: 24 },
      status: { type: String, required: true },
    },
    setup(props) {
      const iconStyles = computed(() => ({
        width: `${props.size}px`,
        height: `${props.size}px`,
      }));

      const checkIconSize = computed(() => (props.size / 1.25).toString());

      return { StepperStatus, iconStyles, checkIconSize };
    },
  });
</script>
<style lang="scss">
  .AtStepperSectionStatusIcon {
    &:not(.completed) .check-icon {
      display: none;
    }

    &-simple {
      border-radius: 50%;
      border: 3px solid var(--gray-600);

      .completed & {
        border-color: var(--pri-500);
        background-color: var(--pri-500);
        color: var(--gray-100);
      }
    }

    .check-icon {
      color: var(--white);
    }
  }
</style>
