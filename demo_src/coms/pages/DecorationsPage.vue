<template>
  <Page class="DecorationsPage" title="CSS Class decorations">
    <BasicClassVisualizerList title="elevations" :class-text="elevations" />
    <BasicClassVisualizerList
      title="borders"
      :class-text="borders"
      :decoration-class="['border-black']"
    />
    <BasicClassVisualizerList
      title="border radius"
      :class-text="rounded"
      :decoration-class="['border-black', 'border', 'pad-block-04']"
    />
  </Page>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import BasicClassVisualizerList from '../comps/css_visualizers/BasicClassVisualizerList.vue';
  import { ClassText } from '../comps/css_visualizers/types';
  import { generateClassTexts } from '../comps/css_visualizers/utils';
  import Page from './comps/Page.vue';

  export default defineComponent({
    name: 'DecorationsPage',
    components: { Page, BasicClassVisualizerList },
    setup() {
      const elevationClasses = [
        'elevation-level-00',
        'elevation-level-01',
        'elevation-level-02',
        'elevation-level-03',
      ];

      const borderClasses = [
        'no-border',
        'border',
        'border-top',
        'border-right',
        'border-bottom',
        'border-left',
        'border-block-start',
        'border-block-end',
        'border-inline-start',
        'border-inline-end',
      ];

      const spacings = [
        '00',
        '005',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        'fields',
        'auto',
      ];

      const borderRadius = ['rounded', ...spacings.map((cls) => `rounded-${cls}`)];

      const elevations: ClassText[] = generateClassTexts(elevationClasses);
      const borders: ClassText[] = generateClassTexts(borderClasses);
      const rounded: ClassText[] = generateClassTexts(borderRadius);

      return {
        elevations,
        borders,
        rounded,
      };
    },
  });
</script>
