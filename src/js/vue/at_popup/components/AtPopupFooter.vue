<template>
  <footer class="AtPopupFooter" :class="{ divider: showDividerLine }">
    <slot></slot>
    <div class="popup-buttons" v-if="showPopupButtons">
      <AtButton class="popup secondary" @click="$emit('close')" :disabled="buttonsDisabled" v-if="showCancelButton">
        {{ cancelText || $t('cancel') }}
      </AtButton>
      <AtButton
        class="popup"
        :mood="warningConfirmation ? 'danger' : 'none'"
        @click="$emit('ok')"
        :loading="confirmLoading"
        :disabled="confirmDisabled"
      >
        {{ confirmText || $t('ok') }}
      </AtButton>
    </div>
    <div class="popup-buttons" v-else-if="!disableCloseButton">
      <AtButton class="popup secondary" @click="$emit('close')">
        {{ closeText || $t('close') }}
      </AtButton>
    </div>
  </footer>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import AtButton from '../../at_button/AtButton.vue';
  import { ButtonVisual } from '../../at_button/types';
  import { Appearance } from '../types';

  export default defineComponent({
    name: 'AtPopupFooter',
    components: { AtButton },
    props: {
      appearance: { type: String, default: Appearance.Regular },
      confirmText: { type: String, required: false },
      cancelText: { type: String, required: false },
      closeText: { type: String, required: false },
      showConfirmationButtons: { type: Boolean, default: false },
      buttonsDisabled: { type: Boolean, default: false },
      confirmLoading: { type: Boolean, default: false },
      disableCloseButton: { type: Boolean, default: false },
      showDividerLine: { type: Boolean, default: false },
      confirmDisabled: { type: Boolean, default: false },
    },
    emits: { close: null, ok: null },
    setup(props) {
      const warningConfirmation = computed(
        () => props.appearance === Appearance.WarningConfirmation
      );
      const showPopupButtons = computed(
        () =>
          props.appearance === Appearance.Confirmation ||
          warningConfirmation.value ||
          props.showConfirmationButtons
      );

      const showCancelButton = computed(()=> props.appearance !== Appearance.OnlyConfirm)

      return { warningConfirmation, showPopupButtons, ButtonVisual,showCancelButton };
    },
  });
</script>

<style lang="scss" scoped>
  .AtPopupFooter {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    padding: var(--spacing-02) var(--padding-pop-up-box) var(--padding-pop-up-box);
    &.divider {
      border-top: 1px solid var(--gray-400);
    }
  }
</style>
