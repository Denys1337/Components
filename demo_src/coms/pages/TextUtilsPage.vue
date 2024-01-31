<template>
  <Page class="TextUtilsPage" title="Text &amp; Fonts Utilities">
    <span v-if="typoData && typoData.typoGroups">
      <VisualizedGroup v-for="group in typoData.typoGroups" :key="group.title" :group="group" />
    </span>
    <DivWithTextVisualizerList title="headlines text" :classes="headlineClasses" />
    <DivWithTextVisualizerList title="body text" :classes="bodyClasses" />
    <DivWithTextVisualizerList title="small text" :classes="smallTextClasses" />
    <DivWithTextVisualizerList title="font weight" :classes="weightClasses" />
    <DivWithTextVisualizerList title="text align" :classes="alignClasses" />
    <DivWithTextVisualizerList title="text transform" :classes="transformClasses" />
    <DivWithTextVisualizerList title="white spaces" :classes="whiteSpaces" />
    <DivWithTextVisualizerList title="old titles" :classes="titleClasses" />
  </Page>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { Group } from 'scripts/comps/types';

  import DivWithTextVisualizerList from '../comps/css_visualizers/DivWithTextVisualizerList.vue';
  import VisualizedGroup from '../comps/css_visualizers/VisualizedGroup.vue';
  import { ClassText } from '../comps/css_visualizers/types';
  import useData from '../hooks/useData';
  import Page from './comps/Page.vue';

  export default defineComponent({
    name: 'TextUtilsPage',
    components: { Page, DivWithTextVisualizerList, VisualizedGroup },
    setup() {
      const text = 'quick brown fox';
      const deprecated = false;

      const { result: typoData } = useData<{ typoGroups: Group[] }>('typo');

      const headlineClasses: ClassText[] = [
        { className: 'font-title-xxx-large', text, deprecated },
        { className: 'font-title-xx-large', text, deprecated },
        { className: 'font-title-x-large', text, deprecated },
        { className: 'font-title-large', text, deprecated },
        { className: 'font-title-medium', text, deprecated },
      ];

      const bodyClasses: ClassText[] = [
        { className: 'font-body-default', text, deprecated },
        { className: 'font-body-default-b', text, deprecated },
        { className: 'font-body-small', text, deprecated },
        { className: 'font-body-small-b', text, deprecated },
      ];
      const smallTextClasses: ClassText[] = [
        { className: 'font-tag', text, deprecated },
        { className: 'font-subtext', text, deprecated },
        { className: 'font-subtext-b', text, deprecated },
      ];

      const titleClasses: ClassText[] = [
        { className: 'title-page', text, deprecated: true },
        { className: 'title-normal', text, deprecated: true },
        { className: 'title-normal min-height', text, deprecated: true },
        { className: 'title-form', text, deprecated: true },
        { className: 'title-form-title', text, deprecated: true },
        { className: 'title-form-section', text, deprecated: true },
        { className: 'title-form subtitle', text, deprecated: true },
        { className: 'title-form-title subtitle', text, deprecated: true },
        { className: 'title-form-section subtitle', text, deprecated: true },
      ];

      const weightClasses: ClassText[] = [
        { className: 'font-light', text, deprecated },
        { className: 'font-normal', text, deprecated },
        { className: 'font-medium', text, deprecated },
        { className: 'font-semi-bold', text, deprecated },
        { className: 'font-bold', text, deprecated },
        { className: 'font-bolder', text, deprecated: true },
      ];

      const alignClasses: ClassText[] = [
        { className: 'text-align-start', text, deprecated },
        { className: 'text-align-center', text, deprecated },
        { className: 'text-align-end', text, deprecated },
      ];

      const transformClasses: ClassText[] = [
        { className: 'capitalize', text, deprecated },
        { className: 'uppercase', text, deprecated },
        { className: 'lowercase', text: 'QUicK brown FOX', deprecated },
      ];

      // TODO: require preview
      const inputVariables = [
        { var: '--input-border-weight', text: '', deprecated },
        { var: '--input-border-radius', text: '', deprecated },
        { var: '--input-font-size', text: '', deprecated },
        { var: '--input-horizontal-padding', text: '', deprecated },
        { var: '--input-label-size', text: '', deprecated },
        { var: '--input-max-width', text: '', deprecated },
        { var: '--input-indent', text: '', deprecated },
        { var: '--label-whitespace', text: '', deprecated },
        { var: '--label-hor-offset', text: '', deprecated },
      ];

      // TODO: require preview
      const buttonVariables = [{ var: '--button-border-radius', text: '', deprecated }];

      // white space
      const whiteSpaces: ClassText[] = [
        'whitespace-normal',
        'whitespace-nowrap',
        'whitespace-pre',
        'whitespace-pre-wrap',
        'whitespace-pre-line',
        'whitespace-break-spaces',
      ].map((className) => ({ className, text, deprecated }));

      return {
        titleClasses,
        weightClasses,
        transformClasses,
        inputVariables,
        buttonVariables,
        headlineClasses,
        bodyClasses,
        smallTextClasses,
        alignClasses,
        whiteSpaces,
        typoData,
      };
    },
  });
</script>
