<template>
  <!-- Portaled to body -->
  <Transition name="fade">
    <div
      v-show="tooltipIsDisplayed"
      ref="tooltipRef"
      class="Tooltip elevation-level-03 p-absolute pad-inline-end-00 font-body-small"
      :style="textStyle"
      role="tooltip"
      :id="tooltipId"
      @mouseenter="onMouseEnterTooltip"
      @mouseleave="isInteracting = false"
    >
      <div
        class="Tooltip-content"
        ref="tooltipContentEl"
        :style="{
          'max-height': maxHeight,
        }"
      >
        <slot :close="close">{{ text }}</slot>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    toRefs,
    computed,
    onMounted,
    watch,
    onUnmounted,
    isRef,
  } from 'vue';

  import createId from '@agritask/js-utils/libs/createId';

  import useMutationObserver from '../hooks/useMutationObserver';
  import portalOnCommand from '../utils/portalOnCommand';
  import { AppendConfig } from '../utils/portalOnCommandTypes';
  import useAttachEventsToLauncher from './hooks/useAttachEventsToLauncher';
  import { ARROW_SIZE, ElementReference, tooltipProps } from './types';

  import './tooltip.scss';

  export default defineComponent({
    name: 'TooltipComponent',
    components: {},
    props: tooltipProps,
    setup(props) {
      const launcherRef: ElementReference = ref();
      onMounted(() => {
        findReferenceWithQuerySelector();
      });

      const createPortalConfigObj = (): AppendConfig => ({
        ...props,
        reposition: props.enableReposition,
        updateOnNextTick: true,
        fitWidth: false,
        offset: props.offset,
      });
      const { append, remove, destroy, setAlignWith, setPortalConfig, updatePosition } =
        portalOnCommand('body', props.reference, createPortalConfigObj());

      watch(
        () => props.reference,
        () => {
          if (!props.reference) {
            return;
          }
          if (typeof props.reference === 'object') {
            if (props.reference instanceof HTMLElement || props.reference instanceof Element) {
              launcherRef.value = props.reference;
            } else if (isRef(props.reference)) {
              launcherRef.value = props.reference.value;
            }
          } else {
            findReferenceWithQuerySelector();
          }
          setAlignWith(props.reference);
        },
        { immediate: !!props.reference && typeof props.reference === 'object' }
      );

      function findReferenceWithQuerySelector() {
        if (props.reference && typeof props.reference === 'string') {
          launcherRef.value = (document.querySelector(props.reference) as HTMLElement) || undefined;
          if (!launcherRef.value) {
            console.error(`Tooltip reference - ${props.reference} was not found`);
          }
        }
      }

      const tooltipRef = ref<HTMLElement>();

      const showTooltip = ref(false);

      watch(
        () => [props.show, props.align, props.position, props.reference],
        () => {
          setAlignWith(props.reference);
          setPortalConfig({ ...createPortalConfigObj(), updateOnNextTick: true, fitWidth: false });
          if (props.show === undefined) return;
          showTooltip.value = props.show;
        },
        { immediate: true, deep: true }
      );

      const tooltipId = createId('Tooltip');

      const { triggerWithClick, show, delay } = toRefs(props);

      useAttachEventsToLauncher({
        triggerWithClick,
        showTooltip,
        launcherRef,
        tooltipId,
        show,
        delay,
      });

      const textStyle = computed(() => ({
        '--arrow-size': `${ARROW_SIZE}px`,
        '--tooltip-padding': props.tooltipPadding,
      }));

      const isInteracting = ref(false);

      const onMouseEnterTooltip = () => {
        if (!props.closeOnLeave) {
          isInteracting.value = true;
        }
      };

      const tooltipIsDisplayed = computed(() => showTooltip.value || isInteracting.value);

      watch(
        () => tooltipIsDisplayed.value,
        () => {
          if (tooltipIsDisplayed.value) {
            append(tooltipRef.value);
          } else {
            remove(tooltipRef.value);
          }
        },
        { immediate: true }
      );

      onUnmounted(destroy);

      const close = () => {
        isInteracting.value = false;
      };

      const tooltipContentEl = ref<HTMLElement>();

      // Observer content mutation
      const { startObserving, stopObserving } = useMutationObserver(
        tooltipContentEl,
        updatePosition
      );

      watch(
        () => props.observeContent && tooltipIsDisplayed.value,
        (enable) => {
          enable ? startObserving() : stopObserving();
        }
      );

      return {
        tooltipRef,
        launcherRef,
        isInteracting,
        tooltipIsDisplayed,
        textStyle,
        tooltipId,
        onMouseEnterTooltip,
        // For debugging purposes:
        close,
        tooltipContentEl,
      };
    },
  });
</script>
