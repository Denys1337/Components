<template>
  <div class="SpaceVisualizer pad-block-end-06">
    <h6 class="SpaceVisualizer-title font-body-small block-end-06">
      {{ classList }} <strong v-if="highestValue">({{ highestValue }})</strong>
    </h6>
    <div class="SpaceVisualizer-emulator p-relative">
      <span
        v-for="item in items"
        :key="item.key"
        :style="item.style"
        class="p-absolute emulated"
        :class="item.cls"
      ></span>
    </div>
    <span class="d-none" ref="elem"><slot></slot></span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';

  import { getDefinedCSS, Item, CSSDeclarationKey, getNumericValue } from './utils';

  export default defineComponent({
    name: 'SpaceVisualizer',
    setup() {
      const cssDeclarations: CSSDeclarationKey[] = [
        'marginBlockEnd',
        'marginBlockStart',
        'marginInlineStart',
        'marginInlineEnd',
        'paddingBlockStart',
        'paddingBlockEnd',
        'paddingInlineStart',
        'paddingInlineEnd',
      ];

      const elem = ref();
      const classList = ref<string>('');
      const items = ref<Item[]>([]);
      const highestValue = ref('');

      watch(
        () => elem.value,
        (elem: HTMLElement | undefined) => {
          if (elem?.children.length) {
            const slot = elem.children[0];
            classList.value = Array.from(slot.classList).join(' ');

            items.value = getElementComputed(slot as HTMLElement, cssDeclarations);
            highestValue.value = '';
            const highestValueNum = 0;

            items.value.forEach(({ style }) =>
              Object.values(style).forEach((styleValue) => {
                const [numericValue, unit] = getNumericValue(styleValue);
                if (highestValueNum < numericValue) {
                  highestValue.value = numericValue + unit;
                }
              })
            );
          }
        },
        { immediate: true }
      );

      return { elem, classList, items, highestValue };
    },
  });

  export function getElementComputed(
    elem: HTMLElement,
    cssDeclarations: CSSDeclarationKey[]
  ): Item[] {
    const cssDeclarationAndValues = getDefinedCSS(elem, cssDeclarations);

    return cssDeclarationAndValues.map(([dec, value]) => {
      const isMargin = dec.includes('margin');
      const isBlock = dec.includes('Block');
      const isStart = dec.includes('Start');
      const style: Record<string, string> = {
        width: dec.includes('Inline') ? value : '100%',
        height: dec.includes('Block') ? value : '100%',
      };

      const cls = isMargin ? ['red'] : ['green'];

      // margin
      const position = `inset-${isBlock ? 'block' : 'inline'}-${isStart ? 'start' : 'end'}`;
      style[position] = '0px';

      const position2 = `inset-${isBlock ? 'inline' : 'block'}-start`;
      style[position2] = '0px';

      if (isMargin) {
        const translate = isStart ? -100 : 100;
        if (isBlock) {
          style.transform = `translateY(${translate}%)`;
        } else {
          style.transform = `translateX(${translate}%)`;
        }
      }

      return {
        key: dec,
        style,
        cls,
      };
    });
  }
</script>

<style lang="scss">
  .SpaceVisualizer {
    border-block-end: solid 1px var(--greyE5);

    &-title {
      margin: 0;
      position: relative;
      z-index: 2;
    }

    &-emulator {
      display: inline-block;
      font-size: 0;
      width: 90px;
      height: 90px;
      background: var(--greyBA);
      position: relative;

      > .emulated {
        opacity: 0.8;
        background-size: 10px 10px;

        &.red {
          background-image: repeating-linear-gradient(
            45deg,
            var(--red-500) 0,
            var(--red-500) 25%,
            #ffffff00 0,
            #ffffff00 50%
          );
        }

        &.green {
          background-image: repeating-linear-gradient(
            45deg,
            var(--green-500) 0,
            var(--green-500) 25%,
            #ffffff00 0,
            #ffffff00 50%
          );
        }
      }
    }
  }
</style>
