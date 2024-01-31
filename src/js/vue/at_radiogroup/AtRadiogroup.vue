<template>
  <div class="AtRadiogroup" :class="wrapperClass">
    <template v-if="!readonly">
      <AtRadiobutton
        v-for="option of options"
        :key="option.value"
        :name="name"
        :disabled="disabled || option.disabled"
        @change="onChange"
        @update:modelValue="onInput"
        :model-value="option.value"
        :selected="option.value === modelValue"
        :readonly="readonly"
        :label="option.translate ? $t(option.text) : option.text"
        :size="size"
      />
    </template>
    <ReadonlyField v-else :content="selectedOptionText" />
    <ErrorMessage
      v-show="!!formDisplayErrors && !!errors"
      :errors="errors"
      class="p-absolute"
      :position="errorPosition"
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, watch, PropType } from 'vue';

  import Joi, { AnySchema } from 'joi';

  import { ButtonSize } from '../at_button/types';
  import useFormControl from '../at_form_control/useFormControl';
  import AtRadiobutton from '../at_radiobutton/AtRadiobutton.vue';
  import ErrorMessage from '../error_message/ErrorMessage.vue';
  import ReadonlyField from '../readonly_field/ReadonlyField.vue';
  import getTranslators from '../utils/getTranslators';
  import { Option, Direction } from './types';

  import './at-radiogroup.scss';

  export default defineComponent({
    name: 'AtRadiogroup',
    components: { ReadonlyField, AtRadiobutton, ErrorMessage },
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
      size: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.m,
        validator: (value: ButtonSize) => Object.values(ButtonSize).includes(value),
      },
    },
    emits: ['change', 'update:modelValue'],
    setup(props, { emit }) {
      const { t } = getTranslators();
      const rules = ref<AnySchema[]>([]);

      watch(
        () => props.required,
        (required) => {
          rules.value = required ? [Joi.any().required()] : [Joi.any()];
        },
        { immediate: true }
      );

      const { errors, formDisplayErrors } = useFormControl(props, props.name, false, rules);

      const onChange = (value: string | number) => emit('change', value);

      const onInput = (value: string | number) => emit('update:modelValue', value);

      const wrapperClass = computed(() => ({
        disabled: props.disabled,
        [props.direction]: true,
      }));

      const selectedOptionText = computed<string>(() => {
        if (props.modelValue) {
          const selectedOption = props.options.find(
            (option: Option) => option.value === props.modelValue
          );

          if (!selectedOption) {
            return '';
          }

          return selectedOption.translate ? t(selectedOption.text) : selectedOption.text;
        } else {
          return '';
        }
      });

      return {
        onChange,
        onInput,
        wrapperClass,
        errors,
        formDisplayErrors,
        selectedOptionText,
      };
    },
  });
</script>

<style></style>
