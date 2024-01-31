<template>
  <div
    class="DropdownListContainer styled-scroll ignore-click-away"
    :class="[cssClass, customDropdownClass]"
    :style="style"
    ref="elemRef"
    @scroll="scrollHandler"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, nextTick } from 'vue';

  import useScrollDetection from '../hooks/useScrollDetection';
  import useTimeout from '../hooks/useTimeout';

  import './dropdown_list_container.scss';

  const PADDING_FROM_EDGE = 10;
  const MAX_HEIGHT = 500;

  export default defineComponent({
    name: 'DropdownListContainer',
    props: {
      defaultMaxHeight: { type: Number, default: MAX_HEIGHT },
      resizeOnNextTick: { type: Boolean, default: false },
      minWidth: { type: [Number, String], required: false },
      maxWidth: { type: [Number, String], required: false },
      customDropdownClass: { type: String, default: '' },
    },
    emits: ['scroll-end'],
    setup(props, { emit }) {
      const elemRef = ref<HTMLElement>();
      const cssClass = reactive({ below: true, above: false });

      const { timeout } = useTimeout();

      const style = reactive({
        'max-height': `${props.defaultMaxHeight}px`,
        'min-width': typeof props.minWidth === 'number' ? `${props.minWidth}px` : props.minWidth,
        'max-width': typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth,
      });
      const resize = () => {
        timeout(() => {
          if (!elemRef.value)
            console.warn('DropdownListContainer has no reference to root HTMLElement');

          const winHeight = window.innerHeight;
          const elemScreenY = elemRef.value?.getBoundingClientRect().y || 0;

          style['max-height'] =
            Math.min(props.defaultMaxHeight, winHeight - elemScreenY - PADDING_FROM_EDGE) + 'px';
        }, 100);
      };

      onMounted(() => (props.resizeOnNextTick ? nextTick(resize) : resize()));

      const { scrollHandler } = useScrollDetection(() => emit('scroll-end'), 1);

      return {
        elemRef,
        cssClass,
        style,
        scrollHandler,
      };
    },
  });
</script>
