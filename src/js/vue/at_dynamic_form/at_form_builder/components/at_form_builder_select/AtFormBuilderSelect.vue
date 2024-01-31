<template>
  <ul class="AtFormBuilderSelect AtFormBuilderSelect-list">
    <li
      v-for="(option, index) of options"
      :key="option.value"
      class="d-flex ai-center jc-space-between block-end-04"
    >
      <div class="d-flex w-100">
        <Component
          :is="labelIconComponent"
          disabled
          :selected="false"
          :name="option.value"
          class="AtFormBuilderSelect-icon no-events"
        />
        <AtEditInlineLabel
          :model-value="getTranslatedText(option.label, locale)"
          @update:model-value="updateOptionText($event, index)"
          :is-edit-enabled-by-default="option.value === activeOption"
          class="font-body-default text-gray-1000"
        />
      </div>

      <XIcon
        size="24"
        @click="removeOption(index)"
        v-if="deleteEnabled"
        class="AtFormBuilderSelect-remove-icon text-gray-800 inline-start-06 flex-shrink-0"
      />
    </li>
    <li>
      <AtButton
        :visual="ButtonVisual.tertiary"
        :size="ButtonSize.s"
        @click="addOption"
        class="AtFormBuilderSelect-add-btn"
      >
        <template #start> <PlusIcon size="16" /> </template>
        {{ $t('general.add') }}
      </AtButton>
    </li>
  </ul>
</template>
<script lang="ts">
  import { computed, defineComponent, inject, ref, watch } from 'vue';

  import { PlusIcon, XIcon } from 'vue-tabler-icons';

  import createId from '@agritask/js-utils/libs/createId';

  import { AtCheckbox, AtRadiobutton } from '../../../../../../index';
  import AtButton from '../../../../at_button/AtButton.vue';
  import { ButtonVisual, ButtonSize } from '../../../../at_button/types';
  import AtEditInlineLabel from '../../../../at_edit_inline_label/AtEditInlineLabel.vue';
  import { Locales } from '../../../../at_translations/types';
  import { getTranslatedText } from '../../../../utils/getTranslatedText';
  import getTranslators from '../../../../utils/getTranslators';
  import { AtFormBuilderQuestionProps, AtQuestionType, Option } from '../../../types';
  import { defaultSelectFormBuilderOptions } from './types';

  export default defineComponent({
    name: 'AtFormBuilderSelect',
    components: { AtButton, AtEditInlineLabel, PlusIcon, XIcon },
    props: AtFormBuilderQuestionProps,
    emits: ['update:modelValue'],

    setup(props, { emit }) {
      const locale = inject('language', 'en') as Locales;

      const question = computed({
        get: () => props,
        set: (value) => {
          emit('update:modelValue', value);
        },
      });

      const options = ref<Option[]>([]);
      const activeOption = ref<string>('');
      const { t } = getTranslators();

      const addOption = () => {
        const newOptionValue = createId();
        activeOption.value = newOptionValue;
        // not updating via nextTick
        setTimeout(() => {
          options.value.push({
            value: newOptionValue,
            label: {
              [locale]: `${t('general.option')} ${options.value.length + 1}`,
            },
          });
        });
      };

      const labelIconComponent = computed(() =>
        props.modelValue?.fieldType === AtQuestionType.Select ? AtRadiobutton : AtCheckbox
      );

      const removeOption = (optionIndex: number) => {
        options.value.splice(optionIndex, 1);
      };

      const deleteEnabled = computed(() => options.value.length > 2);

      watch(
        () => options.value,
        (optionValue: Option[]) => {
          // setting default value if no values present
          if (!optionValue || !optionValue.length) {
            activeOption.value = props.modelValue?.options ? '' : '0';
            // not updating via nextTick
            setTimeout(() => {
              options.value =
                props.modelValue?.options || defaultSelectFormBuilderOptions(t, locale);
            });
          }
          if (optionValue.length && question.value.modelValue) {
            question.value.modelValue.options = options.value;
          }
        },
        {
          deep: true,
          immediate: true,
        }
      );

      const updateOptionText = (optionText: string, index: number) => {
        options.value[index].label[locale] = optionText;
      };

      return {
        question,
        options,
        addOption,
        labelIconComponent,
        removeOption,
        deleteEnabled,
        activeOption,
        locale,
        getTranslatedText,
        updateOptionText,
        ButtonVisual,
        ButtonSize,
      };
    },
  });
</script>
<style lang="scss">
  .AtFormBuilderSelect {
    &-list {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    &-icon {
      margin-inline-end: var(--spacing-04);
    }

    &-remove-icon {
      cursor: pointer;

      &:hover {
        color: var(--gray-900);
      }
    }
  }
</style>
