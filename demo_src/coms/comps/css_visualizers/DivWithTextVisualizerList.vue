<template>
  <section class="DivWithTextVisualizerList">
    <h2 v-if="title" class="group-title capitalize">{{ title }}</h2>
    <table v-if="filteredItems.length">
      <tr>
        <th>class</th>
        <th v-if="showBefore">before</th>
        <th>result</th>
        <th v-if="showDetails">details</th>
      </tr>
      <DivWithTextVisualizer
        v-for="item in filteredItems"
        :key="item.className"
        :item="item"
        z-index="1"
        @click="itemClick(item)"
      />
    </table>
  </section>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import useClipboardStore from '../../hooks/useClipboardStore';
  import useFilter from '../../hooks/useFilter';
  import DivWithTextVisualizer from './DivWithTextVisualizer.vue';
  import { ClassText } from './types';

  export default defineComponent({
    name: 'DivWithTextVisualizerList',
    components: { DivWithTextVisualizer },
    props: {
      title: { type: String, required: false },
      classes: { type: Array as PropType<ClassText[]>, default: () => [] },
      showBefore: { type: Boolean, default: false },
      showDetails: { type: Boolean, default: true },
    },
    setup(props) {
      const { toggleCssClass, addCSSProperty } = useClipboardStore();

      const { registerTargetToFilter } = useFilter();

      const itemClick = (item: ClassText) => {
        if (item.className) {
          toggleCssClass(item.className);
        } else if (item.variable) {
          addCSSProperty(item.variable);
        }
      };

      const filteredItems = registerTargetToFilter<ClassText>(props.classes, 'className');

      return {
        itemClick,
        filteredItems,
      };
    },
  });
</script>

<style lang="scss">
  .DivWithTextVisualizerList {
    table {
      border-spacing: var(--normal-space);
    }
  }
</style>
