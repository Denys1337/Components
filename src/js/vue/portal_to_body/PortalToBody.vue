<template>
  <div class="PortalToBody" :class="cls" v-show="showRootElem" ref="root">
    <slot ref="elem"></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted, ref, watch, computed, PropType } from 'vue';

  import { Position, Align } from '@agritask/js-utils/libs/aligning_utils';

  import useTimeout from '../hooks/useTimeout';
  import portalOnCommand from '../utils/portalOnCommand';
  import { AppendConfig } from '../utils/portalOnCommandTypes';

  export default defineComponent({
    name: 'PortalToBody',
    props: {
      alignWith: { type: Object as PropType<HTMLElement | DOMRect>, required: false },
      position: { type: String as PropType<Position>, required: false },
      align: { type: String as PropType<Align>, required: false },
      width: { type: [String, Number], required: false },
      fitWidth: { type: Object as PropType<HTMLElement>, required: false },
      updateOnScreenChange: { type: Boolean, required: false, default: true },
      reposition: { type: Boolean, default: false },
      show: { type: Boolean, required: false, default: undefined },
      delay: { type: Number, default: 0 },
    },
    setup(props) {
      const root = ref<HTMLElement>();
      const elem = ref<HTMLElement>();
      const cls = ref<string[]>([]);

      const { timeout, clear: clearTimeout } = useTimeout();

      const getPortalConfig = (): AppendConfig => ({
        ...props,
        updateOnNextTick: true,
      });

      const { append, remove, destroy, setAlignWith, updatePosition, setPortalConfig } =
        portalOnCommand(document.body, props.alignWith, getPortalConfig());

      const usingShow = () => typeof props.show === 'boolean';

      const getElemOrFirstChild = () => {
        if (elem?.value) {
          return elem.value;
        }
        if (root?.value) {
          return (Array.from(root.value.childNodes) as Element[]).find(
            (elem) => elem.nodeType === 1
          ) as HTMLElement;
        }
        return null;
      };

      const appendElement = () => {
        if (props.delay) {
          cls.value.push('invisible');
          clearTimeout();
          timeout(() => {
            const el = getElemOrFirstChild();
            if (el) {
              el && append(el);
              cls.value = cls.value.filter((cls: string) => cls !== 'invisible');
            }
          }, props.delay);
        } else {
          const el = getElemOrFirstChild();
          el && append(el);
        }
      };

      watch(
        () => props.show,
        () => {
          if (usingShow() && props.show) {
            setAlignWith(props.alignWith);
            setPortalConfig({ ...getPortalConfig(), updateOnNextTick: true });
            appendElement();
          }
        },
        { immediate: true }
      );

      if ((props.alignWith as DOMRect).x !== undefined) {
        watch(
          () => props.alignWith,
          () => updatePosition(),
          { deep: true }
        );
      }

      onMounted(() => {
        if (!usingShow()) {
          appendElement();
        }
      });

      onUnmounted(() => {
        !usingShow() && remove(elem);
        destroy();
      });

      const showRootElem = computed(() => !usingShow() || props.show);

      return {
        root,
        elem,
        showRootElem,
        cls,
      };
    },
  });
</script>
