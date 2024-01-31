<template>
  <Page class="UtilityCSSPage" title="spacing utilities">
    <section>
      <h2 class="group-title">Spacings</h2>
      <div v-if="spacingGroup && spacingGroup.items">
        <button
          v-for="item in spacingGroup.items"
          :key="item.key"
          @click="() => onGroupItemClick(item)"
          class="inline-end-03"
        >
          <SizeVisualizer :item="item" />
        </button>
      </div>
    </section>
    <section>
      <h2 class="group-title">Margins</h2>
      <h4 class="font-normal">format: <strong>[inline|block]-[start|end]-[size]</strong></h4>
      <SpaceVisualizerList :classes="marginClasses" />
    </section>
    <section>
      <h2 class="group-title">Padding</h2>
      <h4 class="font-normal">format: <strong>pad-[inline|block]-[start|end]-[size]</strong></h4>
      <SpaceVisualizerList :classes="paddingClasses" />
    </section>
  </Page>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import { Group, GroupItem } from '../../../scripts/comps/types';
  import SizeVisualizer from '../comps/css_visualizers/SizeVisualizer.vue';
  import SpaceVisualizerList from '../comps/css_visualizers/SpaceVisualizerList.vue';
  import { ClassText } from '../comps/css_visualizers/types';
  import useClipboardStore from '../hooks/useClipboardStore';
  import useData from '../hooks/useData';
  import Page from './comps/Page.vue';

  export default defineComponent({
    name: 'SpacingPage',
    components: { Page, SpaceVisualizerList, SizeVisualizer },
    setup() {
      const mediums = [
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
        'auto',
        'fields',
      ];

      const reduceMedium = (acc: ClassText[], className: string) => {
        mediums.forEach((size) => {
          acc.push({
            className: `${className}${size}`,
            text: `${className}${size}`,
            deprecated: false,
          });
        });
        return acc;
      };
      const reduce2MediumsMix = (acc: ClassText[], className: string) => {
        mediums.forEach((size) => {
          mediums.forEach((sizeB) => {
            acc.push({
              className: `${className}${size}-${sizeB}`,
              text: `${className}${size}-${sizeB}`,
              deprecated: false,
            });
          });
        });
        return acc;
      };

      const { result: spacingData } = useData<{ spacingGroups: Group[] }>('spacings');

      const { toggleCSSPropertyValue } = useClipboardStore();

      const clss = [
        'margin-',
        'inline-',
        'block-',
        'inline-start-',
        'inline-end-',
        'block-start-',
        'block-end-',
      ];
      const marginClasses: ClassText[] = [
        ...clss.reduce(reduceMedium, []),
        ...['margin-'].reduce(reduce2MediumsMix, []),
      ];

      const padClss = [
        'pad-',
        'pad-inline-',
        'pad-block-',
        'pad-inline-start-',
        'pad-inline-end-',
        'pad-block-start-',
        'pad-block-end-',
      ];
      const paddingClasses: ClassText[] = [
        ...padClss.reduce(reduceMedium, []),
        ...['pad-'].reduce(reduce2MediumsMix, []),
      ];

      const spacingGroup = computed(() => {
        if (spacingData.value) {
          return spacingData.value.spacingGroups[1];
        }
        return null;
      });

      const onGroupItemClick = (item: GroupItem) => {
        if (item.isCSSVar) {
          toggleCSSPropertyValue(`var(${item.key})`);
        }
      };

      return {
        marginClasses,
        paddingClasses,
        spacingGroup,
        onGroupItemClick,
      };
    },
  });
</script>
