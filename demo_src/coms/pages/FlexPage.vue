<template>
  <Page class="FlexPage" title="flex">
    <section>
      <BasicClassVisualizerList
        title="flex flow"
        :class-text="flexFlow"
        :decoration-class="['border-black', 'border']"
      />
      <BasicClassVisualizerList
        title="flex wrap"
        :class-text="flexWrap"
        :decoration-class="['border-black', 'border']"
      />
      <BasicClassVisualizerList
        title="flex gap"
        :class-text="gap"
        :decoration-class="['border-black', 'border']"
      />
    </section>
  </Page>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import BasicClassVisualizerList from '../comps/css_visualizers/BasicClassVisualizerList.vue';
  import { generateClassTexts } from '../comps/css_visualizers/utils';
  import Page from './comps/Page.vue';

  export default defineComponent({
    name: 'FlexPage',
    components: { Page, BasicClassVisualizerList },
    setup() {
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

      const flexFlow = generateClassTexts([
        'flex-1',
        'flex-row',
        'flex-row-reverse',
        'flex-col',
        'flex-col-reverse',
      ]);

      const flexWrap = generateClassTexts(['flex-nowrap', 'flex-wrap', 'flex-wrap-reverse']);
      const gap = generateClassTexts(spacings.map((space) => `gap-${space}`));

      return { flexFlow, flexWrap, gap };
    },
  });
</script>
