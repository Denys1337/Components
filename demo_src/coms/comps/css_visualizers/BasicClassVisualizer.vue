<template>
  <button
    class="BasicClassVisualizer p-relative"
    @click="onClick"
    @mouseenter="onMouseEnter"
    @mouseleave="cssBody = null"
  >
    <div class="BasicClassVisualizer-wrapper pad-block-05">
      <div class="BasicClassVisualizer-item" :class="classNames">{{ renderedText }}</div>
    </div>
    <h4 v-if="classItems.length === 1">{{ classItems[0].className }}</h4>
    <ol v-else class="ol">
      <li v-for="cls in classItems" :key="cls.className">.{{ cls.className }}</li>
    </ol>
    <!-- eslint-disable vue/no-v-html -->
    <div
      class="BasicClassVisualizer-popup pad-02 elevation-level-03 z1"
      v-if="saniziedCSSBody"
      v-html="saniziedCSSBody"
    ></div>
  </button>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, ref } from 'vue';

  import useContentSanitizer from '../../../../src/js/vue/hooks/useContentSanitizer';
  import { getCssBySelectors } from '../../../helpers/cssRules';
  import useClipboardStore from '../../hooks/useClipboardStore';
  import { ClassText } from './types';

  export default defineComponent({
    name: 'BasicClassVisualizer',
    props: {
      classList: { type: Object as PropType<ClassText[] | ClassText>, required: true },
      decorationClass: { type: Array as PropType<string[]>, default: () => [] },
    },
    setup(props) {
      const classItems = computed(() =>
        Array.isArray(props.classList) ? props.classList : [props.classList]
      );

      const classNames = computed(() => {
        return [...classItems.value.map(({ className }) => className), ...props.decorationClass];
      });

      const { addCssClass } = useClipboardStore();

      const onClick = () => {
        addCssClass(classItems.value.map(({ className }) => className!));
      };

      const renderedText = computed(() => classItems.value[0]?.text || 'quock brown fox');
      const cssBody = ref('');
      const saniziedCSSBody = useContentSanitizer(cssBody);

      const onMouseEnter = () => {
        cssBody.value =
          getCssBySelectors(classItems.value.map(({ className }) => `.${className}`)).join(
            '; <br/>'
          ) + ';';
      };

      return {
        classItems,
        classNames,
        onClick,
        renderedText,
        onMouseEnter,
        cssBody,
        saniziedCSSBody,
      };
    },
  });
</script>

<style lang="scss">
  .BasicClassVisualizer {
    &-wrapper {
      background-color: var(--green-100);
      border-color: var(--green-500);
    }

    &-item {
      border-width: 0;
    }

    ol {
      list-style: none;
    }

    &-popup {
      position: absolute;
      inset-inline-start: 0;
      top: 100%;
      background: var(--background);
      border: solid 1px var(--gray-300);
      text-align: start;
    }
  }
</style>
