<template>
  <Page class="ColorsPage" title="colors">
    <section>
      <template v-if="groups">
        <VisualizedGroup v-for="group in groups" :key="group.title" :group="group" />
      </template>
    </section>
    <BasicClassVisualizerList title="text colors" :class-text="textColors" />
    <BasicClassVisualizerList title="background colors" :class-text="bgColors" />
    <BasicClassVisualizerList
      title="border colors"
      :class-text="borderColors"
      :decoration-class="['border']"
    />
  </Page>
</template>

<script lang="ts">
  import { defineComponent, watch, ref, Ref } from 'vue';

  import { Group } from 'scripts/comps/types';

  import BasicClassVisualizerList from '../comps/css_visualizers/BasicClassVisualizerList.vue';
  import VisualizedGroup from '../comps/css_visualizers/VisualizedGroup.vue';
  import { generateClassTexts } from '../comps/css_visualizers/utils';
  import useData from '../hooks/useData';
  import Page from './comps/Page.vue';

  export default defineComponent({
    name: 'ColorsPage',
    components: { Page, VisualizedGroup, BasicClassVisualizerList },
    setup() {
      const colors = [
        'white',
        'gray-100',
        'gray-200',
        'gray-300',
        'gray-400',
        'gray-500',
        'gray-600',
        'gray-700',
        'gray-800',
        'gray-900',
        'gray-1000',
        'black',
        'pri-100',
        'pri-500',
        'pri-600',
        'pri-800',
        'red-100',
        'red-500',
        'red-600',
        'red-800',
        'danger-100',
        'danger-500',
        'danger-600',
        'danger-800',
        'green-100',
        'green-500',
        'orange-100',
        'orange-500',
        'bg-500',
      ];

      const { result } = useData<{ colorGroups: Group[] }>('colors');

      const groups: Ref<Group[]> = ref([]);

      watch(
        () => result.value,
        (result) => (groups.value = result ? result.colorGroups : [])
      );

      const textColors = generateClassTexts(colors.map((color) => `text-${color}`));
      const bgColors = generateClassTexts(colors.map((color) => `bg-${color}`));
      const borderColors = generateClassTexts(colors.map((color) => `border-${color}`));

      return {
        groups,
        textColors,
        bgColors,
        borderColors,
      };
    },
  });
</script>
