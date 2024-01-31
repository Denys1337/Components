<template>
  <div class="AtInput mt mt-container mt-input-height" :disabled="disabled" :class="wrapperClass">
    <ReadonlyField v-if="readonly" :label="title" :content="modelValue" />
    <template v-else>
      <label v-if="title" :for="fieldId" class="mt-label" :class="labelClasses">
        {{ title }}
      </label>
      <input
        v-if="!readonly"
        :type="type"
        ref="inputEl"
        :id="fieldId"
        class="input ellipsis"
        :value="modelValue"
        :maxlength="maxlength"
        :name="name"
        :style="{ direction }"
        :disabled="disabled"
        :placeholder="placeholder"
        v-bind="{ ...$attrs, ...maxAndMin }"
        v-on="customListeners"
        :title="tooltipText"
        @blur="updateTooltipText"
      />
    </template>
    <ErrorMessage
      v-show="(wasFocusedAndReleased || formDisplayErrors) && !!errors"
      :position="errorPosition"
      :use-custom-error-messages="useCustomErrorMessages"
      :errors="errors"
      class="p-absolute"
    />
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onMounted,
    ref,
    toRefs,
    watch,
    PropType,
    SetupContext,
  } from 'vue';

  import { AnySchema } from 'joi';

  import { LanguageDirection } from '@agritask/js-utils/libs/types';

  import { ButtonSize } from '../at_button/types';
  import { SimpleValidation } from '../at_form_control/useFormControl';
  import ErrorMessage from '../error_message/ErrorMessage.vue';
  import useFieldUtilities from '../hooks/useFieldUtilities';
  import useInputRules from '../hooks/useInputRules';
  import { UseInputRulesParams } from '../hooks/useInputRules';
  import useLabelRequiredClasses from '../hooks/useLabelRequiredClasses';
  import ReadonlyField from '../readonly_field/ReadonlyField.vue';
  import './at-input.scss';
  import { Props } from './types';

  export default defineComponent({
    name: 'AtInput',
    components: { ErrorMessage, ReadonlyField },
    props: {
      modelValue: { type: String, default: '' },
      maxlength: { type: Number, required: false, default: 99999 },
      minlength: { type: Number, required: false, default: 0 },
      maxNumber: { type: Number, required: false },
      minNumber: { type: Number, required: false },
      title: { type: String, required: false },
      required: { type: Boolean, default: false },
      passiveRequired: { type: Boolean, default: false },
      invalid: { type: Boolean, default: false },
      readonly: { type: Boolean, default: false },
      name: { type: String, required: false },
      id: { type: String, required: false },
      type: { type: String, default: 'text' },
      rules: { type: Array as PropType<Array<AnySchema | SimpleValidation>>, required: false },
      errorPosition: { type: String, default: 'bottom' },
      ignored: { type: Boolean, default: false },
      direction: {
        type: String as PropType<LanguageDirection>,
        default: 'inherit',
        validator: (value: any) => Object.values(LanguageDirection).includes(value),
      },
      lazy: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      formatter: { type: Function as PropType<(value: any) => any>, required: false },
      placeholder: { type: String, default: '' },
      debounceTime: { type: Number, default: 0 },
      size: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.m,
        validator: (value: any) => Object.values(ButtonSize).includes(value),
      },
      useCustomErrorMessages: { type: Boolean, default: false },
    },
    emits: ['is-valid', 'update:modelValue', 'change'],
    setup(props, context) {
      const inputEl = ref<HTMLInputElement>();

      const { rules } = useInputRules(props as UseInputRulesParams);

      const {
        customListeners,
        labelIsUp,
        wrapperClass,
        fieldId,
        wasFocusedAndReleased,
        errors,
        formDisplayErrors,
      } = useFieldUtilities(
        inputEl,
        props as Props,
        context as SetupContext,
        'AtInput',
        rules,
        props.formatter
      );

      watch(
        () => errors.value,
        () => {
          const isValid = !errors.value || errors.value?.length === 0;
          context.emit('is-valid', {
            isValid,
            errors: errors.value,
          });
        }
      );

      // focusInput is available for the usage of a parent component with a ref
      // e.g: atInputRef.value?.focusInput();
      const focusInput = () => {
        inputEl.value?.focus();
      };

      const { required, passiveRequired } = toRefs(props);

      const labelRequiredClasses = useLabelRequiredClasses(required, passiveRequired);

      const labelClasses = computed(() => ({
        up: labelIsUp.value,
        ...labelRequiredClasses.value,
      }));

      const tooltipText = ref('');

      const updateTooltipText = () => {
        const input = inputEl.value;
        tooltipText.value =
          input && input.offsetWidth < input.scrollWidth ? `${props.modelValue}` : '';
      };
      const maxAndMin = computed(() => {
        if (props.type === 'number') {
          return {
            max: props.maxNumber,
            min: props.minNumber,
          };
        }
        return {};
      });
      onMounted(updateTooltipText);

      return {
        customListeners,
        inputEl,
        labelIsUp,
        wrapperClass,
        fieldId,
        errors,
        wasFocusedAndReleased,
        formDisplayErrors,
        focusInput,
        labelClasses,
        updateTooltipText,
        tooltipText,
        maxAndMin,
      };
    },
  });
</script>
