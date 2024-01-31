<template>
  <div class="FontVarVisualizer">
    <h4 class="text-align-center">
      {{ item.key }} (<strong>{{ item.calculatedValue }})</strong>
    </h4>
    <div :style="style">Aa</div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import { GroupItem } from 'scripts/comps/types';

  export default defineComponent({
    name: 'FontVarVisualizer',
    props: {
      item: { type: Object as PropType<GroupItem>, required: true },
    },
    setup(props) {
      const style = computed(() => {
        const styleResult: Record<string, string> = {};
        const calculatedValue = props.item.calculatedValue;
        if (/^(\d+\.?\d{0,})(px|rem|em)$/i.test(calculatedValue)) {
          styleResult['font-size'] = calculatedValue;
        }
        if (/^(\d+\.?\d{0,})$/.test(calculatedValue)) {
          styleResult['font-weight'] = calculatedValue;
        }
        return styleResult;
      });

      return {
        style,
      };
    },
  });
</script>
