<template>
  <header class="AtPopupTitle popup-title" :class="{ divider: showDividerLine }">
    <AlertTriangleIcon
      v-if="appearance === Appearance.Error || warningConfirmation"
      class="popup-icon"
      style="color: var(--danger-500)"
    />

    <section>
      <slot>
        <h3 v-if="showDefaultTitle" class="popup-title-content" :class="`font-title-${titleSize}`">
          {{ titleText || $t(`${baseTranslationPath}.${translationPath}.title`) }}
        </h3>
      </slot>
    </section>
  </header>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import { AlertTriangleIcon } from 'vue-tabler-icons';

  import { Appearance, Size } from '../types';

  export default defineComponent({
    name: 'AtPopupTitle',
    components: { AlertTriangleIcon },
    props: {
      appearance: { type: String, default: Appearance.Regular },
      baseTranslationPath: { type: String, required: false },
      translationPath: { type: String, required: false },
      titleText: { type: String, required: false },
      showDividerLine: { type: Boolean, default: false },
      titleSize: { type: String, default: Size.Large },
    },
    setup(props) {
      const warningConfirmation = computed(
        () => props.appearance === Appearance.WarningConfirmation
      );
      const showDefaultTitle = computed(
        () => !!(props.titleText || (props.baseTranslationPath && props.translationPath))
      );
      return { AlertTriangleIcon, showDefaultTitle, Size, warningConfirmation, Appearance };
    },
  });
</script>

<style scoped lang="scss">
  .popup-title {
    display: flex;
    padding: var(--padding-pop-up-box);
    position: sticky;
    top: 0;
    background: white;
    z-index: var(--popup-z);
    border-radius: 8px 8px 0 0;

    &.divider {
      border-bottom: 1px solid var(--gray-400);
    }
  }

  .popup-icon {
    width: 27px;
    height: 27px;
    margin-inline-end: var(--spacing-01);
  }

  .popup-title-content {
    color: var(--gray-1000);

    line-height: 1.4;
    letter-spacing: normal;
    &:empty {
      display: none;
    }
  }
</style>
