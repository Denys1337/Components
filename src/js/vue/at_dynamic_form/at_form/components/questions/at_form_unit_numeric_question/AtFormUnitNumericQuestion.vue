<template>
  <div class="AtFormUnitNumericQuestion d-flex ai-center">
    <AtInputSelect
      :options="selectOptions"
      v-model="model"
      :min-number="settings.min"
      :max-number="settings.max"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, PropType, inject, Ref, ref } from 'vue';

  import AtInputSelect from '../../../../../at_input_select/AtInputSelect.vue';
  import { Locales } from '../../../../../at_translations/types';
  import {
    getAtFormBuilderNumericUnitQuestionDefaultValue,
    convertAtUnitNumericToInputSelect,
    convertInputSelectValueToAtUnitNumeric,
  } from '../../../../at_form_builder/components/at_form_builder_numeric_unit_question/types';
  import { UnitGroupOptionsModel } from '../../../../shared/types';
  import { UNIT_OPTIONS_INJECTION } from '../../../../shared/types';
  import { AtFormQuestionProps } from '../../../../types';
  import { UnitNumericModelValue } from '../../../../types';
  import { getUnitTranslation } from '../../../utils';

  export default defineComponent({
    name: 'AtFormUnitNumericQuestion',
    components: {
      AtInputSelect,
    },
    props: {
      ...AtFormQuestionProps,
      modelValue: {
        type: Object as PropType<UnitNumericModelValue>,
        default: () => ({
          valueType: '',
          inputValue: '',
        }),
      },
      valueParser: {
        type: Function,
        default: convertAtUnitNumericToInputSelect,
      },
      valueFormatter: {
        type: Function,
        default: convertInputSelectValueToAtUnitNumeric,
      },
    },
    emits: ['update:modelValue'],
    setup(props, context) {
      const locale = inject('language', 'en') as Locales;
      const unitOptions = inject(UNIT_OPTIONS_INJECTION, ref([])) as Ref<UnitGroupOptionsModel[]>;

      const model = computed({
        get: () =>
          (props.modelValue as UnitNumericModelValue)?.valueType ||
          (props.modelValue as UnitNumericModelValue)?.inputValue
            ? props.valueParser(props.modelValue)
            : getAtFormBuilderNumericUnitQuestionDefaultValue(props),
        set: (value) => {
          context.emit('update:modelValue', props.valueFormatter(value));
        },
      });

      const selectOptions = computed(() =>
        props.options.map((opt) => ({
          text: getUnitTranslation(unitOptions.value, opt.value, locale),
          value: opt.value,
        }))
      );
      return {
        model,
        selectOptions,
      };
    },
  });
</script>
<style lang="scss"></style>
