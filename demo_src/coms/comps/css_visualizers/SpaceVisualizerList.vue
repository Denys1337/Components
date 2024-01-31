<template>
  <div class="SpaceVisualizerList at-grid gap-column-0">
    <button
      class="at-col-2"
      v-for="cls in filteredClasses"
      :key="cls.className"
      @click="() => toggleCssClass(cls.className)"
    >
      <SpaceVisualizer class="text-center">
        <span :class="cls.className"></span>
      </SpaceVisualizer>
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import useClipboardStore from '../../hooks/useClipboardStore';
  import useFilter from '../../hooks/useFilter';
  import SpaceVisualizer from './SpaceVisualizer.vue';
  import { ClassText } from './types';

  export default defineComponent({
    name: 'SpaceVisualizerList',
    components: { SpaceVisualizer },
    props: {
      classes: { type: Array as PropType<ClassText[]>, default: () => [] },
    },
    setup(props) {
      const { toggleCssClass } = useClipboardStore();

      const { registerTargetToFilter } = useFilter();

      const filteredClasses = registerTargetToFilter(props.classes, 'className');

      return {
        toggleCssClass,
        filteredClasses,
      };
    },
  });
</script>
