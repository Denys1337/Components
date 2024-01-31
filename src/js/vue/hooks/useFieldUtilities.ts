import { computed, Ref, SetupContext, watch } from 'vue';

import debounce from 'lodash-es/debounce';

import createId from '@agritask/js-utils/libs/createId';

import useFormControl, { Validations } from '../at_form_control/useFormControl';
import { FieldProps } from './fieldUtilitiesTypes';
import useFocusBlurHandlers from './useFocusBlurHandlers';

type Field = HTMLInputElement | HTMLTextAreaElement;

export default function useFieldUtilities(
  fieldEl: Ref<Field | undefined>,
  props: FieldProps,
  context: SetupContext,
  idPrefix: string = 'Field',
  validations: Validations | undefined,
  formatter?: (value: any) => any
) {
  const {
    focused,
    wasFocusedAndReleased,
    reset: resetFocusAndRelease,
  } = useFocusBlurHandlers(fieldEl);

  const fieldId = props.id || props.name || createId(idPrefix);
  const { errors, formDisplayErrors } = useFormControl(
    props,
    fieldId,
    props.ignored ?? false,
    validations
  );

  const labelIsUp = computed(
    () => (props.title && focused.value) || !!props.modelValue?.length || !!props.placeholder
  );

  const displayAsInvalid = computed(
    () =>
      (props.invalid || (errors.value && errors.value.length > 0)) &&
      (formDisplayErrors.value || (wasFocusedAndReleased.value && !focused.value))
  );

  const wrapperClass = computed(() => ({
    readonly: props.readonly,
    'mt-disabled': props.disabled,
    'mt-invalid': displayAsInvalid.value,
    [`input-size-${props.size || 'm'}`]: true,
  }));

  // Attaching only otherListeners
  const { update: modelValue, change, ...otherListeners } = context.attrs;

  let value: string;
  const debouncer = debounce((targetValue: Field) => {
    handleUpdateValue(targetValue);
  }, props.debounceTime);

  const onInput = (event: KeyboardEvent) => {
    if (props.disabled) return;
    const target = event.currentTarget as Field;
    const { value: targetValue } = target;
    value = formatter ? formatter(targetValue) : targetValue;
    if (props.lazy) return;
    if (props.debounceTime) {
      debouncer(target);
    } else {
      handleUpdateValue(target);
    }
  };

  const onChange = (event: Event) => {
    if (props.disabled) return;
    if (props.lazy) {
      handleUpdateValue(event.currentTarget as Field);
    }
    context.emit('change', value);
  };

  const handleUpdateValue = (target: Field) => {
    if (formatter && target.value !== value) {
      target.value = value;
    }
    context.emit('update:modelValue', value);
  };

  const textLength = computed(() =>
    props.modelValue !== undefined ? String(props.modelValue).length : 0
  );

  watch(() => props.modelValue, resetFocusAndRelease);

  return {
    labelIsUp,
    displayAsInvalid,
    wrapperClass,
    fieldId,
    customListeners: { change: onChange, input: onInput, ...otherListeners },
    textLength,
    wasFocusedAndReleased,
    errors,
    formDisplayErrors,
  };
}

export function useLabelRequiredClasses(
  required: Ref<boolean>,
  passiveRequired?: Ref<boolean | undefined>
) {
  if (required.value && passiveRequired?.value) {
    console.error(
      'You passed both required and passiveRequired props equal to true, passiveRequired will be ignored'
    );
  }

  const labelClasses = computed(() => ({
    asterisk: required.value || passiveRequired?.value,
    required: required.value,
    'passive-required': !required.value && passiveRequired?.value,
  }));

  return labelClasses;
}
