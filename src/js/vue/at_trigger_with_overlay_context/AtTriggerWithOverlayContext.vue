<template>
  <div class="AtTriggerWithOverlayContext" :class="{ disabled, focused: showOverlay }">
    <div class="trigger-wrapper" ref="rootElRef">
      <slot name="trigger"></slot>
    </div>
    <PortalToBody
      :align-with="rootElRef"
      :reposition="true"
      :position="overlayPosition"
      :align="overlayAlign"
      v-bind="$props"
      v-if="showOverlayModel"
      :fit-width="fitTriggerWidth ? rootElRef : fitOverlayWidth"
    >
      <div ref="overlayContainerRef" :class="customOverlayClass">
        <slot name="overlay"></slot>
      </div>
    </PortalToBody>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, PropType } from 'vue';

  import useClickOutside from '../hooks/useClickOutside';
  import PortalToBody from '../portal_to_body/PortalToBody.vue';

  export const DEFAULT_MIN_WIDTH = '350px';

  export default defineComponent({
    name: 'AtTriggerWithOverlayContext',
    components: {
      PortalToBody,
    },
    model: {
      prop: 'showOverlay',
      event: 'update:toggle-overlay',
    },
    props: {
      disabled: { type: Boolean, default: false },
      minOverlayWidth: { type: String, default: DEFAULT_MIN_WIDTH },
      maxOverlayWidth: { type: String, required: false },
      overlayPosition: { type: String, default: 'bottom' },
      overlayAlign: { type: String, default: 'start' },
      customOverlayClass: { type: String, default: '' },
      showOverlay: { type: Boolean, required: false },
      fitTriggerWidth: { type: Boolean, default: false },
      fitOverlayWidth: { type: Object as PropType<HTMLElement>, required: false },
    },
    emits: ['update:toggle-overlay'],
    setup(props, { emit }) {
      const rootElRef = ref<HTMLElement>();
      const overlayContainerRef = ref<HTMLElement>();
      const showOverlayModel = computed({
        get: () => props.showOverlay,
        set: (newValue: boolean) => {
          emit('update:toggle-overlay', newValue);
        },
      });

      useClickOutside([overlayContainerRef, rootElRef], () => {
        if (showOverlayModel.value) {
          showOverlayModel.value = false;
        }
      });

      return {
        showOverlayModel,
        rootElRef,
        overlayContainerRef,
      };
    },
  });
</script>
