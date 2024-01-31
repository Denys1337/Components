<template>
  <progress class="AtProgressBar d-block" :value="progress" max="100" :class="size"></progress>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { ProgressBarSize } from './types';

  /**
   * Progress bars show continuous progress through a process, such as a percentage value.
   */
  export default defineComponent({
    name: 'AtProgressBar',
    props: {
      progress: {
        type: Number,
        default: 0,
        validator(value: number) {
          return value >= 0 && value <= 100;
        },
      },
      size: {
        type: String,
        default: ProgressBarSize.Small,
      },
    },
  });
</script>
<style lang="scss" scoped>
  .AtProgressBar {
    width: 100%;
    border-radius: 0.5rem;
    -webkit-appearance: none;

    &.progress-big {
      height: 8px;
    }

    &.progress-small {
      height: 4px;
    }

    &::-webkit-progress-value {
      background-color: var(--pri-500);
      border-radius: 0.5rem;
    }

    &::-webkit-progress-bar {
      border-radius: 0.5rem;
      background-color: var(--gray-400);
    }
  }
</style>
