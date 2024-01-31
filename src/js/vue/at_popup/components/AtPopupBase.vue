<template>
  <div v-show="show" class="AtPopupBase">
    <ClickAway @clickaway="onClickAway">
      <section class="popup-box" :class="currentSize">
        <button
          v-if="showCloseIcon"
          type="button"
          @click="$emit('close', false)"
          aria-label="Close"
          class="close-button"
          :disabled="disableCloseIcon"
        >
          <i class="icon icon-close"></i>
        </button>
        <slot></slot>
      </section>
    </ClickAway>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch } from 'vue';

  import ClickAway from '../../click_away/ClickAway.vue';
  import { atPopupBaseVueProps } from '../types';

  export default defineComponent({
    name: 'AtPopupBase',
    components: { ClickAway },
    model: {
      prop: 'show',
      event: 'close',
    },
    props: {
      ...atPopupBaseVueProps,
    },
    emits: { close: null, visible: null },
    setup(props, { emit }) {
      watch(
        () => props.show,
        () => {
          props.show && emit('visible');
        },
        { immediate: true }
      );

      function onClickAway() {
        if (props.show && !props.disableClickAway) {
          emit('close');
        }
      }

      return {
        onClickAway,
      };
    },
  });
</script>

<style lang="scss">
  @import '../../../../style/scss/_mixin';
  @import '../../../../style/scss/_base_functions';

  .AtPopupBase {
    overflow: hidden;
    position: fixed;
    inset-block-start: var(--header-height);
    inset-inline: 0;
    inset-block-end: 0;
    background-color: rgba(0, 0, 0, 0.45);
    z-index: var(--popup-z);
    --padding-pop-up-box: 24px;

    .small {
      max-width: 576px;
      max-height: 72%;
    }

    .medium {
      max-width: 640px;
      max-height: 84%;
    }

    .large {
      max-width: 992px;
      max-height: 96%;
    }

    .close-button {
      position: absolute;
      right: pxToRem(24);
      top: pxToRem(24);
      padding: 0;
      opacity: 1;
      z-index: calc(var(--popup-z) + 1);

      body[dir='rtl'] & {
        right: auto;
        left: pxToRem(24);
      }
    }

    .icon-close {
      color: var(--gray-800);
      font-size: pxToRem(15);
    }

    .popup-box {
      box-sizing: border-box;
      width: 100%;
      height: auto;
      position: absolute;
      border-radius: 8px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: var(--white);
      box-shadow: 0 24px 24px 0 rgba(0, 0, 0, 0.3), 0 0 24px 0 rgba(0, 0, 0, 0.22);

      @include media-breakpoint-down(md) {
        width: 95%;
        overflow-y: auto;
      }
    }
  }
</style>
