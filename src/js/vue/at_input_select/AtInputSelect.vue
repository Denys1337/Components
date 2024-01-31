<template>
  <div class="AtInputSelect d-flex jc-end">
    <AtInput
      class="w-100"
      v-model="inputModel"
      :disabled="disabled"
      :max-number="maxNumber"
      :min-number="minNumber"
      type="number"
      :formatter="formatValue"
    />
    <AtSelect
      :options="options"
      v-model="selectModel"
      :show-clear-button="false"
      :search-button-enabled="false"
      :filter="false"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, computed } from 'vue';

  import AtInput from '../at_input/AtInput.vue';
  import AtSelect from '../at_select/AtSelect.vue';
  import { Option } from '../at_select/types';
  import { InputSelectModelValue } from './types';

  export default defineComponent({
    name: 'AtInputSelect',
    components: {
      AtInput,
      AtSelect,
    },
    props: {
      options: { type: Array as PropType<Option[]>, required: true },
      disabled: { type: Boolean, default: false },
      modelValue: {
        type: Object as PropType<InputSelectModelValue>,
        required: true,
      },
      maxNumber: {
        type: Number,
      },
      minNumber: {
        type: Number,
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const selectModel = computed({
        get: () => props.modelValue.selectValue,
        set: (value) => {
          emit('update:modelValue', {
            inputValue: inputModel.value,
            selectValue: value,
          });
        },
      });
      const inputModel = computed({
        get: () => props.modelValue.inputValue,
        set: (value) => {
          emit('update:modelValue', {
            inputValue: value,
            selectValue: selectModel.value,
          });
        },
      });
      const formatValue = (value: string): string => {
        let localValue = value;

        if (localValue === '.') {
          localValue = '0.';
        }

        return (localValue ? parseFloat(localValue) : localValue) + '';
      };

      return {
        inputModel,
        selectModel,
        formatValue,
      };
    },
  });
</script>

<style scoped lang="scss">
  .AtInputSelect {
    border: solid 1px var(--gray-600);
    background: var(--white);
    border-radius: 0.375rem;

    .AtInput {
      border: none;
      border-inline-end: solid 1px var(--gray-600);
      border-radius: 0;

      :deep(.input) {
        background: transparent;

        &:focus-visible {
          outline: none;
        }
      }
    }
    .AtSelect {
      min-width: max-content;
      grid-gap: 0;

      :deep(.AtSelectBodyJumpingLabel) {
        padding-inline-end: var(--spacing-03);
      }
      :deep(> .width-inherit) {
        min-width: max-content;
      }

      :deep(.mt-container) {
        border: none;
        background: transparent;
      }
      :deep(.AtSelectBody-button) {
        min-width: max-content;

        padding-inline-start: var(--spacing-01);
        padding-inline-end: var(--spacing-01);
      }
    }
  }
</style>
