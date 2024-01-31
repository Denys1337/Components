<template>
  <svg v-bind="svgElementProps">
    <circle
      v-bind="circleElementProps"
      fill="none"
      stroke="#e6e6e6"
      stroke-width="2"
      class="base"
    />
    <circle
      v-bind="circleElementProps"
      class="progress"
      fill="none"
      stroke-width="2"
      pathLength="100"
      stroke-dasharray="100"
      :style="{
        'stroke-dashoffset': 100 - progress,
      }"
    />
  </svg>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';

  export interface PieChartIconProps {
    progress: number;
    size: number;
  }

  export default defineComponent({
    name: 'PieChartIcon',
    components: {},
    props: {
      progress: {
        type: Number,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const svgElementProps = computed(() => ({
        width: props.size,
        height: props.size,
        viewBox: `0 0 ${props.size} ${props.size}`,
      }));

      const circleElementProps = computed(() => ({
        cx: props.size / 2,
        cy: props.size / 2,
        r: props.size / 2 - 1,
      }));

      return {
        svgElementProps,
        circleElementProps,
      };
    },
  });
</script>
<style lang="scss" scoped>
  svg {
    transform: rotate(-90deg);
  }

  .base {
    stroke: var(--gray-400);
  }
  .progress {
    stroke: var(--pri-500);
  }
</style>
