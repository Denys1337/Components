<template>
  <label
    v-if="!readonly"
    @keyup.enter="onChange"
    class="AtCheckbox mt"
    :class="wrapperClass"
    :for="fieldId"
  >
    <input
      class="at-checkbox-input"
      type="checkbox"
      @change="onChange"
      :id="fieldId"
      :disabled="disabled"
      :value="inputValue"
      :checked="isChecked"
      :indeterminate="indeterminate"
      v-on="otherListeners"
    />
    <span class="at-checkbox" :class="{ checked: isChecked || indeterminate, disabled, required }">
      <CheckIcon
        v-show="isChecked && !indeterminate"
        class="at-checkbox-icon icon-tables-active"
        size="18"
      />
      <MinusIcon v-show="indeterminate" class="at-checkbox-icon indeterminate" size="18" />
    </span>
    <span class="at-checkbox-label mt-input-font">
      {{ label }}
    </span>
    <slot></slot>
    <span class="required-sign" v-if="required">*</span>
  </label>
  <ReadonlyField v-else :content="isChecked" :label="label" />
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import { CheckIcon, MinusIcon } from 'vue-tabler-icons';

  import createId from '@agritask/js-utils/libs/createId';

  import { ButtonSize } from '../at_button/types';
  import ReadonlyField from '../readonly_field/ReadonlyField.vue';
  import './at-checkbox.scss';

  export default defineComponent({
    name: 'AtCheckbox',
    components: {
      ReadonlyField,
      CheckIcon,
      MinusIcon,
    },
    props: {
      disabled: { type: Boolean, default: false },
      required: { type: Boolean, required: false },
      invalid: { type: Boolean, required: false },
      label: { type: String, required: false },
      inputValue: { type: [Number, String, Boolean], default: '' },
      modelValue: { type: [Number, String, Boolean], default: '' },
      readonly: { type: Boolean, default: false },
      indeterminate: { type: Boolean, default: false },
      selected: { type: Boolean, default: false },
      size: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.m,
        validator: (value: ButtonSize) => Object.values(ButtonSize).includes(value),
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, attrs }) {
      const fieldId = createId('AtCheckbox');
      const isChecked = computed(() => {
        if (props.selected) {
          return props.selected;
        }

        if (props.inputValue === '') {
          return !!props.modelValue;
        }

        return props.modelValue === props.inputValue;
      });

      function onChange(e: Event) {
        const isChecked = (e.target as HTMLInputElement).checked;

        if (props.inputValue === '') {
          emit('update:modelValue', isChecked);
          return;
        }

        if (isChecked) {
          emit('update:modelValue', props.inputValue);
        } else {
          emit('update:modelValue');
        }
      }

      // Attaching otherListeners
      const { input, ...otherListeners } = attrs;

      const wrapperClass = computed(() => ({
        'mt-invalid': props.invalid,
        disabled: props.disabled,
        [`input-size-${props.size || 'm'}`]: true,
      }));

      return {
        fieldId,
        onChange,
        isChecked,
        otherListeners,
        wrapperClass,
      };
    },
  });
</script>
