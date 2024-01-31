<template>
  <div class="AtRadiogroupWithLabel">
    <b v-if="disabled || readonly" class="radio-label" :class="[readonly ? 'readonly' : '']">
      {{ label }}:
    </b>
    <label v-else class="radio-label later-required">{{ label }}: </label>

    <AtRadiogroup v-model="model" :options="options" :name="name" v-bind="{ ...props }" />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import { ButtonSize } from '../at_button/types';
  import AtRadiogroup from './AtRadiogroup.vue';
  import { Option, Direction } from './types';

  export default defineComponent({
    name: 'AtRadiogroupWithLabel',
    components: {
      AtRadiogroup,
    },
    props: {
      disabled: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
      options: { type: Array as PropType<Option[]>, required: true },
      name: { type: String, required: true },
      modelValue: { type: [String, Number, Boolean] },
      direction: {
        type: String,
        default: 'inline',
        validator: (value: Direction) => Object.values(Direction).includes(value),
      },
      readonly: { type: Boolean, default: false },
      errorPosition: { type: String, required: false },
      label: { type: String, required: true },
      size: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.m,
        validator: (value: ButtonSize) => Object.values(ButtonSize).includes(value),
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const model = computed({
        get: () => props.modelValue,
        set: (value) => {
          emit('update:modelValue', value);
        },
      });

      return {
        model,
        props,
      };
    },
  });
</script>

<style></style>
