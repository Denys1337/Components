<template>
  <div class="AtCheckBoxGroup" :class="direction">
    <AtCheckbox
      v-for="option of options"
      :key="option.value"
      :name="name + option.value"
      :disabled="disabled || option.disabled"
      :selected="isOptionSelected(option.value)"
      :input-value="option.value"
      @update:model-value="onInput($event, option.value)"
      :label="option.translate ? $t(option.text) : option.text"
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import AtCheckbox from '../at_checkbox/AtCheckbox.vue';
  import { AtCheckBoxGroupOption, Direction } from './types';

  export default defineComponent({
    name: 'AtCheckBoxGroup',
    components: { AtCheckbox },
    props: {
      disabled: { type: Boolean, default: false },
      options: { type: Array as PropType<AtCheckBoxGroupOption[]>, required: true },
      name: { type: String, required: true },
      modelValue: { type: Array as PropType<string[]>, required: true },
      direction: {
        type: String,
        default: 'inline',
        validator: (value: Direction) => Object.values(Direction).includes(value),
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const model = computed<Array<string | number>>({
        get: () => props.modelValue,
        set: (value) => {
          emit('update:modelValue', value);
        },
      });

      const onInput = (event: undefined | string, optionValue: string | number) => {
        if (event !== undefined) {
          model.value = [...model.value, optionValue];
        } else {
          model.value = [...model.value.filter((option) => option !== optionValue)];
        }
      };

      const isOptionSelected = (optionValue: string | number): boolean =>
        model.value.includes(optionValue);

      return {
        model,
        onInput,
        isOptionSelected,
      };
    },
  });
</script>
<style scoped lang="scss">
  .AtCheckBoxGroup {
    display: flex;

    &.column {
      flex-direction: column;
    }
    &.inline {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      row-gap: 1em;
    }
    .AtCheckbox:not(:last-child) {
      margin-block-end: var(--spacing-04);
    }
    .AtCheckbox:last-child {
      margin-block-end: 0;
    }
  }
</style>
