<template>
  <div class="AtProgressBarLegend">
    <AtProgressBarLabels
      v-bind="props"
      class="block-end-02"
      v-if="textPosition === ProgressBarTextPosition.Top"
    />
    <AtProgressBar v-bind="props" />
    <AtProgressBarLabels
      v-bind="props"
      class="block-start-02"
      v-if="textPosition === ProgressBarTextPosition.Bottom"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import AtProgressBar from './AtProgressBar.vue';
  import AtProgressBarLabels from './components/AtProgressBarLabels.vue';
  import { ProgressBarSize, ProgressBarTextPosition } from './types';

  /**
   * Progress bars with legend shows continuous progress through a process with labels at the bottom.
   */
  export default defineComponent({
    name: 'AtProgressBarLegend',
    components: {
      AtProgressBar,
      AtProgressBarLabels,
    },
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
      actionText: {
        type: String,
      },
      resultText: {
        type: String,
      },
      textPosition: {
        type: String,
        default: ProgressBarTextPosition.Bottom,
      },
    },
    setup(props) {
      return {
        props,
        ProgressBarTextPosition,
      };
    },
  });
</script>
<style lang="scss">
  .legend {
    color: var(--gray-800);
    font-weight: 600;
    line-height: 1.4;

    &.progress-big {
      font-size: 0.875rem;
    }

    &.progress-small {
      font-size: 0.75rem;
    }
  }
</style>
