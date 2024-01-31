<template>
  <div class="AllOptionsSelectionButton d-flex">
    <AtButton
      visual="link"
      @click="$emit('select-all-options')"
      :disabled="isSelectAllOptionsDisabled"
    >
      {{ selectAllOptionsTitle }}
    </AtButton>
    <Loader v-if="isSelectAllLoading" />
    <span v-show="isSelectAllOptionsDisabled">
      <img :src="icon" ref="errorTooltip" class="icon-info inline-start-02" />
      <Tooltip :reference="errorTooltip" position="inline-end">
        {{ $t('select.error.error_tooltip') }}
      </Tooltip>
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue';

  import icon from '../../assets/warning-icon.svg';
  import AtButton from '../at_button/AtButton.vue';
  import Loader from '../loaders/loader/Loader.vue';
  import Tooltip from '../tooltip/Tooltip.vue';
  import getTranslators from '../utils/getTranslators';

  export default defineComponent({
    name: 'AllOptionsSelectionButton',
    components: { AtButton, Tooltip, Loader },
    props: {
      isSelectAllOptionsDisabled: { type: Boolean, default: false },
      isSelectAllLoading: { type: Boolean, default: false },
      searchedOptionsCount: { type: Number, required: false },
    },
    emits: ['select-all-options'],
    setup(props) {
      const { t } = getTranslators();
      const errorTooltip = ref<HTMLElement | undefined>();

      const selectAllOptionsTitle = computed(() =>
        t('select.search.select_all', props.searchedOptionsCount)
      );

      return {
        selectAllOptionsTitle,
        errorTooltip,
        icon,
      };
    },
  });
</script>
<style lang="scss">
  .AllOptionsSelectionButton {
    align-items: center;
    gap: var(--spacing-02);
  }
</style>
