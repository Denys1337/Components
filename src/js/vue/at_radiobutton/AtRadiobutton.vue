<template>
  <div class="AtRadiobutton mt" :class="wrapperClass">
    <label v-if="!readonly" class="at-radiobutton-label" @click="click" :for="fieldId">
      <span class="at-radiobutton p-relative" :class="{ disabled, checked: isSelected }"></span>
      <input
        class="at-radiobutton-input"
        type="radio"
        :disabled="disabled"
        @click="click"
        @change="onChange"
        @update:modelValue="input"
        :value="modelValue"
        :name="name"
        :checked="isSelected"
        :id="fieldId"
      />
      <span class="mt-input-font">
        {{ label }}
      </span>
    </label>
    <ReadonlyField v-else :label="label" :content="isSelected" />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import createId from '@agritask/js-utils/libs/createId';

  import { ButtonSize } from '../at_button/types';
  import ReadonlyField from '../readonly_field/ReadonlyField.vue';
  import './at-radiobutton.scss';

  export default defineComponent({
    name: 'AtRadiobutton',
    components: { ReadonlyField },
    model: {
      prop: 'model',
      event: 'update:model',
    },
    props: {
      disabled: { type: Boolean, default: false },
      modelValue: { type: [String, Number, Boolean], required: true },
      label: { type: String, default: '' },
      name: { type: String, required: true },
      selected: { type: Boolean, default: null, required: false },
      model: { type: [String, Number, Boolean], required: false },
      readonly: { type: Boolean, default: false },
      size: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.m,
        validator: (value: ButtonSize) => Object.values(ButtonSize).includes(value),
      },
    },
    emits: ['change', 'update:model', 'click', 'update:modelValue'],
    setup(props, { emit }) {
      const fieldId = createId('AtRadiobutton');

      const isSelected = computed(() => {
        if (typeof props.selected === 'boolean') {
          return props.selected;
        }
        return props.modelValue === props.model;
      });

      const onChange = () => {
        emit('change', props.modelValue);
        emit('update:modelValue', props.modelValue);
      };

      const wrapperClass = computed(() => ({
        disabled: props.disabled,
        [`input-size-${props.size || 'm'}`]: true,
      }));

      return {
        click: (e: Event) => emit('click', e),
        input: () => emit('update:modelValue', props.modelValue),
        onChange,
        fieldId,
        isSelected,
        wrapperClass,
      };
    },
  });
</script>
