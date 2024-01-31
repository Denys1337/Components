<template>
  <Teleport to="body">
    <AtPopupBase
      :class="['AtPopup', $attrs.class]"
      :show="show"
      :show-close-icon="showCloseIcon"
      :disable-click-away="disableClickAway"
      :current-size="currentSize"
      :disable-close-icon="buttonsDisabled"
      @close="$emit('close')"
    >
      <AtPopupTitle
        :appearance="appearance"
        :base-translation-path="baseTranslationPath"
        :translation-path="translationPath"
        :title-text="titleText"
        :show-divider-line="showDividerLine"
        :title-size="titleSize"
      >
        <slot name="title"></slot>
      </AtPopupTitle>
      <section class="popup-content styled-scroll">
        <slot>
          {{ popupContent }}
        </slot>
      </section>
      <AtPopupFooter
        :disable-close-button="disableCloseButton"
        :appearance="appearance"
        :confirm-text="confirmText"
        :cancel-text="cancelText"
        :close-text="closeText"
        :buttons-disabled="buttonsDisabled"
        :confirm-disabled="confirmDisabled || buttonsDisabled"
        :confirm-loading="confirmLoading"
        :show-confirmation-buttons="showConfirmationButtons"
        :show-divider-line="showDividerLine"
        v-if="showFooter"
        @close="$emit('close')"
        @ok="$emit('ok')"
      >
        <slot name="footer"></slot>
      </AtPopupFooter>
    </AtPopupBase>
  </Teleport>
</template>

<script lang="ts">
  import { computed, defineComponent, onBeforeMount, onUnmounted } from 'vue';

  import AtPopupBase from './components/AtPopupBase.vue';
  import AtPopupFooter from './components/AtPopupFooter.vue';
  import AtPopupTitle from './components/AtPopupTitle.vue';
  import { atPopupVueProps } from './types';

  export default defineComponent({
    name: 'AtPopup',
    components: { AtPopupFooter, AtPopupBase, AtPopupTitle },
    props: {
      ...atPopupVueProps,
    },
    emits: ['close', 'ok', 'update:modelValue'],
    setup(props, { emit }) {
      onBeforeMount(() => {
        document.addEventListener('keyup', handleKeyupEsc);
      });
      onUnmounted(() => {
        document.removeEventListener('keyup', handleKeyupEsc);
      });
      function handleKeyupEsc(event: KeyboardEvent) {
        if (event.key === 'Escape' || event.key == 'Esc') {
          emit('close');
        }
      }
      const popupContent = computed(() => {
        if (props.contentText) return props.contentText;
        if (props.baseTranslationPath && props.translationPath)
          return `${props.baseTranslationPath}.${props.translationPath}.content`;
        return '';
      });
      const showDefaultTitle = computed(
        () => !!(props.titleText || (props.baseTranslationPath && props.translationPath))
      );
      return {
        showDefaultTitle,
        popupContent,
      };
    },
  });
</script>

<style lang="scss">
  @import '../../../style/scss/_mixin';
  @import '../../../style/scss/_base_functions';

  .AtPopup {
    .popup-title {
      display: flex;
      padding-bottom: 8px;
      position: sticky;
      padding-top: var(--padding-pop-up-box);
      top: 0;
      background: white;
      z-index: var(--popup-z);
    }

    .popup-box {
      display: flex;
      flex-direction: column;
    }

    .popup-icon {
      width: 27px;
      height: 27px;
      margin-right: 4px;

      body[dir='rtl'] & {
        margin-right: 0;
        margin-left: 4px;
      }
    }

    .popup-title-content {
      &:empty {
        display: none;
      }
    }

    .popup-content {
      font-size: 1rem;
      padding: 0 var(--padding-pop-up-box);
      font-weight: normal;
      line-height: 1.57;
      letter-spacing: normal;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 1em;
      overflow-y: auto;
    }

    .popup-buttons {
      margin-left: auto;
      background: white;
      z-index: var(--popup-z);
      display: flex;

      .popup:not(:last-child) {
        margin-inline-end: var(--spacing-04);
      }

      body[dir='rtl'] & {
        margin-left: unset;
        margin-right: auto;
      }
    }
  }
</style>
