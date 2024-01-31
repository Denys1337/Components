<template>
  <div class="AtSelectBodyJumpingLabel">
    <label class="AtSelectBody-label mt-label no-events" :class="customLabelClasses">
      {{ label }}
    </label>
    <div class="AtSelectBodyJumpingLabel-result d-flex jc-space-between">
      <button class="AtSelectBody-button ellipsis mt-input-font" type="button" :title="resultText">
        {{ resultText }}
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, toRefs } from 'vue';

  import useLabelRequiredClasses from '../../../../hooks/useLabelRequiredClasses';
  import getTranslators from '../../../../utils/getTranslators';
  import { atSelectBodyProps } from '../types';

  export default defineComponent({
    name: 'AtSelectBodyJumpingLabel',
    components: {},
    props: atSelectBodyProps,
    setup(props) {
      const { t } = getTranslators();

      const selectionsText = (selected: number, params = {}) =>
        t('general.selections', selected, params);

      const resultText = computed(() => {
        if (!props.selectedOptions?.length) {
          return props.dropdownOpened ? selectionsText(0) : '';
        }
        if (props.multiple) {
          return selectionsText(props.selectedOptions.length, {
            count: props.selectedOptions.length,
          });
        }
        const selectedOption = props.selectedOptions[0];
        return selectedOption.translate
          ? t(selectedOption[props.textField])
          : selectedOption[props.textField];
      });

      const labelIsUp = computed(() => resultText.value);

      const { required, passiveRequired } = toRefs(props);
      const labelRequiredClasses = useLabelRequiredClasses(required, passiveRequired);
      const customLabelClasses = computed(() => ({
        up: labelIsUp.value,
        'pad-00': !props.label,
        ...props.labelClasses,
        ...labelRequiredClasses.value,
      }));

      return {
        customLabelClasses,
        resultText,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .AtSelectBodyJumpingLabel {
    height: 100%;
    &-result {
      height: 100%;
    }
  }
</style>
