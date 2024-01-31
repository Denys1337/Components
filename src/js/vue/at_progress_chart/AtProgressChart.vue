<template>
  <div class="AtProgressChart d-flex" ref="legendElement">
    <div
      v-for="option of lines"
      :key="chartId + option.mood"
      class="AtProgressChart-line inline-end-02"
      :class="option.mood"
      :style="option.styles"
    ></div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType, ref } from 'vue';

  import createId from '@agritask/js-utils/libs/createId';

  import {
    AtProgressChartLine,
    AtProgressChartOption,
    MINIMUM_PERCENTAGE_TO_DISPLAY,
  } from './types';

  export default defineComponent({
    name: 'AtProgressChart',
    components: {},
    props: {
      options: {
        type: Array as PropType<AtProgressChartOption[]>,
        default: () => [],
      },
      totalValue: {
        type: Number,
        required: true,
      },
      chartId: {
        type: String,
        default: createId('ProgressChart'),
      },
    },
    setup(props) {
      const legendElement = ref<HTMLElement>();

      const getOptionStyles = (percentage: number): Record<string, string> => {
        if (!legendElement.value) {
          return {};
        }

        if (percentage < MINIMUM_PERCENTAGE_TO_DISPLAY) {
          return { maxWidth: '10px' };
        }

        return {
          minWidth: percentage + '%',
        };
      };

      const getValuePercentage = (value: number): number => (value * 100) / props.totalValue;
      const lines = computed(() =>
        props.options.reduce<AtProgressChartLine[]>((acc, option) => {
          const valuePercentage = getValuePercentage(option.value);

          if (valuePercentage >= 1) {
            acc.push({
              ...option,
              styles: getOptionStyles(valuePercentage),
            });
          }

          return acc;
        }, [])
      );

      return {
        legendElement,
        lines,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .danger {
    --accent-color: var(--red-500);
  }

  .success {
    --accent-color: var(--green-500);
  }

  .idle {
    --accent-color: var(--gray-500);
  }

  .AtProgressChart {
    &-line {
      height: 8px;
      width: 100%;
      background-color: var(--accent-color);

      &:last-child {
        margin-inline-end: 0;
        border-start-end-radius: 25px;
        border-end-end-radius: 25px;
      }

      &:first-child {
        border-start-start-radius: 25px;
        border-end-start-radius: 25px;
      }
    }
  }
</style>
