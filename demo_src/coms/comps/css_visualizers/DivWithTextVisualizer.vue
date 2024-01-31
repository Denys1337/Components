<template>
  <tr class="DivWithTextVisualizer" z-index="1" @click="$emit('click', item)">
    <td>{{ item.className }}</td>
    <td v-if="showBefore">{{ item.text }}</td>
    <td>
      <span :class="item.className" ref="elem">{{ item.text }}</span>
    </td>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <td v-if="showDetails" v-html="styleDetails"></td>
  </tr>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue';

  import useElementComputedStyleString from '../../hooks/useElementComputedStyleString';
  import { ClassText } from './types';

  const fontStyleKeys = ['fontSize', 'fontWeight', 'lineHeight', 'color'];

  export default defineComponent({
    name: 'DivWithTextVisualizer',
    props: {
      item: { type: Object as PropType<ClassText>, required: true },
      showBefore: { type: Boolean, default: false },
      showDetails: { type: Boolean, default: true },
    },
    emits: ['click'],
    setup() {
      const elem = ref<HTMLElement>();
      return {
        elem,
        styleDetails: useElementComputedStyleString(elem, fontStyleKeys),
      };
    },
  });
</script>

<style lang="scss">
  .DivWithTextVisualizer {
    &:hover {
      background: var(--pri-100);
    }
  }
</style>
