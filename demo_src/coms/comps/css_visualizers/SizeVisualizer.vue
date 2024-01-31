<template>
  <button class="SizeVisualizer">
    <h4 class="text-align-center">
      {{ item.key }} (<strong>{{ item.calculatedValue }})</strong>
    </h4>
    <div
      class="SizeVisualizer-visual margin-02-auto"
      :style="{ width: item.calculatedValue, height: item.calculatedValue }"
    ></div>
  </button>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import { GroupItem } from '../../../../scripts/comps/types';

  export default defineComponent({
    name: 'SizeVisualizer',
    props: {
      item: { type: Object as PropType<GroupItem>, required: true },
    },
    setup() {
      return {};
    },
  });
</script>

<style lang="scss">
  .SizeVisualizer {
    &-visual {
      background-color: var(--pri-600);
    }
  }
</style>
