<template>
  <AtPopup
    :show="show"
    :confirm-text="$t('form_builder.apply')"
    :cancel-text="$t('form_builder.cancel')"
    :title-text="$t('form_builder.choose_units')"
    show-close-icon
    disable-click-away
    show-divider-line
    show-confirmation-buttons
    @ok="handleOk"
    @close="handleClose"
  >
    <AtSelect
      v-model="unitGroup"
      :label="$t('general.units.select_units_group')"
      :options="unitGroupOptions"
      class="w-100 block-start-08"
      :placeholder="$t('form_builder.select_category')"
      :show-clear-button="false"
      :filter="false"
    />
    <AtCheckBoxGroup
      v-if="unitGroup"
      class="block-start-06 block-end-04 font-body-small pad-inline-03"
      v-model="selectedUnitsModel"
      name="units"
      :options="unitOptions"
    />
    <template #footer>
      <AtButton
        v-if="selectedUnitsModel.length"
        :mood="ButtonMood.danger"
        visual="tertiary"
        @click="clearSelectedUnits"
        >{{ $t('form_builder.clear_units') }}</AtButton
      >
    </template>
  </AtPopup>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, PropType, ref, watch } from 'vue';

  import AtButton from '../../../../at_button/AtButton.vue';
  import { ButtonMood } from '../../../../at_button/types';
  import AtCheckBoxGroup from '../../../../at_checkbox_group/AtCheckBoxGroup.vue';
  import AtPopup from '../../../../at_popup/AtPopup.vue';
  import AtSelect from '../../../../at_select/AtSelect.vue';
  import { Option as AtSelectOption } from '../../../../at_select/types';
  import { Locales } from '../../../../at_translations/types';
  import { getTranslatedText } from '../../../../utils/getTranslatedText';
  import { UnitGroupOptionsModel } from '../../../shared/types';
  import { Option as AtDynamicFormOption } from '../../../types';
  export default defineComponent({
    name: 'AtFormBuilderUnitPopup',
    components: { AtCheckBoxGroup, AtPopup, AtSelect, AtButton },
    props: {
      show: { type: Boolean, required: true },
      unitOptionGroups: {
        type: Array as PropType<UnitGroupOptionsModel[]>,
        required: true,
      },
      selectedUnits: {
        type: Array as PropType<AtDynamicFormOption[]>,
        default: () => [],
      },
      modelValue: {
        type: Object as PropType<UnitGroupOptionsModel>,
        required: true,
      },
    },
    emits: ['ok', 'update:modelValue'],
    setup(props, { emit }) {
      const selectedUnitsModel = ref<string[]>(props.modelValue.options.map((opt) => opt.value));
      const locale = inject('language', 'en') as Locales;
      const getUnitGroupTitle = (option: AtDynamicFormOption) => {
        return props.unitOptionGroups.find((optGroup) =>
          optGroup.options.find((opt) => opt.value === option.value)
        )?.groupTitle;
      };

      const unitGroup = props.modelValue.options?.length
        ? ref(getUnitGroupTitle(props.modelValue.options[0]))
        : ref('');

      const unitGroupOptions = computed<AtSelectOption[]>(() =>
        props.unitOptionGroups
          .map((optGroup: UnitGroupOptionsModel) => ({
            value: optGroup.groupTitle,
            text: optGroup.groupTitle,
          }))
          .sort((a, b) => a.text.localeCompare(b.text))
      );

      const unitOptions = computed(() => {
        if (!unitGroup.value) {
          return [];
        }

        return props.unitOptionGroups
          .find((optGroup: UnitGroupOptionsModel) => optGroup.groupTitle === unitGroup.value)!
          .options.map((opt) => ({ text: getTranslatedText(opt.label, locale), value: opt.value }));
      });
      const clearSelectedUnits = () => {
        selectedUnitsModel.value = [];
      };
      watch(
        () => unitGroup.value,
        () => {
          selectedUnitsModel.value = [];
        }
      );

      const handleClose = () => {
        selectedUnitsModel.value = props.selectedUnits.map((unit) => unit.value);
      };

      const handleOk = () => {
        const options = unitOptions.value.reduce((acc, opt: AtSelectOption) => {
          if (selectedUnitsModel.value.includes(opt.value)) {
            return [...acc, opt];
          }
          return acc;
        }, [] as AtSelectOption[]);

        emit(
          'update:modelValue',
          selectedUnitsModel.value.length
            ? {
                options: options.map((opt) => ({
                  label: { [locale]: opt.text },
                  value: opt.value,
                })),
                groupTitle: unitGroup.value,
              }
            : { options: [], groupTitle: '' }
        );
        emit('ok');
      };

      watch(
        () => props.show,
        () => {
          selectedUnitsModel.value = props.modelValue.options.map((opt) => opt.value);
          unitGroup.value = props.modelValue.groupTitle;
        }
      );

      return {
        selectedUnitsModel,
        clearSelectedUnits,
        unitGroup,
        unitGroupOptions,
        unitOptions,
        handleClose,
        handleOk,
        ButtonMood,
      };
    },
  });
</script>
