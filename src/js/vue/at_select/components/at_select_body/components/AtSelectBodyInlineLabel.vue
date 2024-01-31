<template>
  <div class="AtSelectBodyInlineLabel d-flex jc-space-between ai-center">
    <label class="AtSelectBody-label mt-label ellipsis" :class="customLabelClasses">
      <AtTruncateWithTooltip
        :full-text="labelAndValues"
        :length="maxLabelLength"
        :offset="20"
        position="top"
        :show="dropdownOpened ? false : undefined"
        class="mt-input-font"
      />
    </label>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, toRefs } from 'vue';

  import AtTruncateWithTooltip from '../../../../at_truncate_with_tooltip/AtTruncateWithTooltip.vue';
  import { useLabelRequiredClasses } from '../../../../hooks/useFieldUtilities';
  import getTranslators from '../../../../utils/getTranslators';
  import { atSelectBodyProps } from '../types';

  export default defineComponent({
    name: 'AtSelectBodyInlineLabel',
    components: { AtTruncateWithTooltip },
    props: atSelectBodyProps,
    setup(props) {
      const { required, passiveRequired } = toRefs(props);
      const labelRequiredClasses = useLabelRequiredClasses(required, passiveRequired);
      const customLabelClasses = computed(() => ({
        'label-with-values': props.selectedOptions?.length,
        ...props.labelClasses,
        ...labelRequiredClasses.value,
      }));

      const { t } = getTranslators();

      const labelAndValues = computed(() => {
        if (!props.selectedOptions?.length) {
          return props.label;
        }
        if (props.multiple) {
          return props.selectedOptions.length
            ? `${props.label} (${props.selectedOptions.length})`
            : props.label;
        }
        const selectedOption = props.selectedOptions[0];
        const translatedSelectedOption = selectedOption.translate
          ? t(selectedOption[props.textField])
          : selectedOption[props.textField];
        return props.showLabelWithSelected
          ? `${props.label} (${translatedSelectedOption})`
          : translatedSelectedOption;
      });

      return {
        customLabelClasses,
        labelAndValues,
      };
    },
  });
</script>
<style scoped lang="scss">
  .AtSelectBodyInlineLabel {
    height: 100%;
    .AtSelectBody-label.mt-label {
      position: static;
      margin: 0;
      top: unset;
      transform: unset;
    }
  }

  .label-with-values {
    color: var(--gray-1000);
  }
</style>
