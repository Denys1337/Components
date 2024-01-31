<template>
  <section class="BasicClassVisualizerList">
    <h2>{{ title }}</h2>
    <div class="at-grid gap-column-1">
      <BasicClassVisualizer
        class="at-col-3"
        v-for="cls in classText"
        :key="cls.className"
        :class-list="cls"
        :decoration-class="decorationClass"
        @click="toggleCssClass(cls.className)"
      />
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import BasicClassVisualizer from './BasicClassVisualizer.vue';
  import { ClassText } from './types';

  export default defineComponent({
    name: 'BasicClassVisualizerList',
    components: { BasicClassVisualizer },
    props: {
      classText: { type: Array as PropType<ClassText[]>, required: true },
      title: { type: String, required: true },
      decorationClass: { type: Array as PropType<string[]>, default: () => [] },
    },
    setup: () => ({}),
  });
</script>
