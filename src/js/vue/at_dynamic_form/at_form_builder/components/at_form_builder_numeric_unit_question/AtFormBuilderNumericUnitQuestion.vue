<template>
  <div class="AtFormBuilderNumericUnitQuestion d-flex ai-center">
    <template v-if="!unitModel.options.length">
      <AtInput
        type="number"
        disabled
        :placeholder="$t('form_builder.short_text_placeholder')"
        v-bind="$attrs"
      />

      <AtButton
        visual="tertiary"
        class="inline-start-02"
        @click="showUnitPopup = true"
        :size="ButtonSize.m"
      >
        <template #start> <PlusIcon size="16" /> </template>

        {{ $t('form_builder.add_units') }}
      </AtButton>
    </template>
    <template v-else>
      <AtInputSelect
        :options="atInputSelectUnits"
        disabled
        v-model="inputSelectModelValue"
        v-bind="$attrs"
      />
      <AtButton
        visual="tertiary"
        class="inline-start-02"
        @click="showUnitPopup = true"
        :size="ButtonSize.m"
      >
        <template #start> <EditIcon size="16" /> </template>

        {{ $t('form_builder.edit') }}
      </AtButton>
    </template>
  </div>
  <AtFormBuilderUnitPopup
    v-if="showUnitPopup && unitOptionGroups"
    :show="showUnitPopup"
    @close="showUnitPopup = false"
    @ok="showUnitPopup = false"
    :unit-option-groups="unitOptionGroups"
    :selected-units="unitModel.options"
    v-model="unitModel"
  />
</template>

<script lang="ts">
  import { computed, defineComponent, inject, PropType, ref, watch } from 'vue';

  import { PlusIcon, EditIcon } from 'vue-tabler-icons';

  import AtButton from '../../../../at_button/AtButton.vue';
  import { ButtonSize } from '../../../../at_button/types';
  import AtInput from '../../../../at_input/AtInput.vue';
  import AtInputSelect from '../../../../at_input_select/AtInputSelect.vue';
  import { InputSelectModelValue } from '../../../../at_input_select/types';
  import { Option as AtSelectOption } from '../../../../at_select/types';
  import { Locales } from '../../../../at_translations/types';
  import { getTranslatedText } from '../../../../utils/getTranslatedText';
  import { UnitGroupOptionsModel } from '../../../shared/types';
  import { AtFormBuilderQuestionProps } from '../../../types';
  import { AtQuestionType } from '../../../types';
  import AtFormBuilderUnitPopup from '../../popups/at_form_builder_unit_popup/AtFormBuilderUnitPopup.vue';
  import { getAtFormBuilderNumericUnitQuestionDefaultValue } from './types';

  export const AtFormBuilderNumericUnitQuestionVueProps = {
    ...AtFormBuilderQuestionProps,
    unitOptionGroups: {
      type: Array as PropType<UnitGroupOptionsModel[]>,
      required: true,
    },
  };

  export default defineComponent({
    name: 'AtFormBuilderNumericUnitQuestion',
    components: {
      AtButton,
      AtInput,
      PlusIcon,
      AtFormBuilderUnitPopup,
      AtInputSelect,
      EditIcon,
    },
    props: AtFormBuilderNumericUnitQuestionVueProps,
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const showUnitPopup = ref(false);
      const locale = inject('language', 'en') as Locales;
      const unitModel = ref<UnitGroupOptionsModel>({
        options: props.modelValue?.options || [],
        groupTitle: '',
      });
      const inputSelectModelValue = computed<InputSelectModelValue>(() =>
        getAtFormBuilderNumericUnitQuestionDefaultValue(unitModel.value)
      );

      const question = computed({
        get: () => props,
        set: (value) => {
          emit('update:modelValue', value);
        },
      });
      const atInputSelectUnits = computed<AtSelectOption[]>(() =>
        unitModel.value.options.map((opt) => ({
          text: getTranslatedText(opt.label, locale),
          value: opt.value,
        }))
      );
      watch(
        () => unitModel.value.options,
        () => {
          if (unitModel.value.options?.length && question.value.modelValue) {
            question.value.modelValue.fieldType = AtQuestionType.UnitNumeric;
            question.value.modelValue.options = unitModel.value.options.map((opt) => {
              return {
                value: opt.value!,
                label: { [locale]: getTranslatedText(opt.label, locale) },
              };
            });
          } else if (!unitModel.value.options?.length && question.value.modelValue) {
            question.value.modelValue.fieldType = AtQuestionType.Number;
            question.value.modelValue.options = [];
          }
        },
        { immediate: true }
      );
      return {
        question,
        showUnitPopup,
        unitModel,
        inputSelectModelValue,
        atInputSelectUnits,
        locale,
        ButtonSize,
      };
    },
  });
</script>
<style lang="scss">
  .AtFormBuilderNumericUnitQuestion {
    .AtInputSelect {
      max-width: 450px;
    }
  }
</style>
