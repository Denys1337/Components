import { inject, ref, onMounted, onUnmounted, Ref, isRef, watch, computed } from 'vue';

import { AnySchema, ValidationErrorItem } from 'joi';

import createId from '@agritask/js-utils/libs/createId';

import { DataKeys, FormActions, FORM_INJECTION } from './types';

let emptyFormActions: FormActions;

function getEmptyFormActions() {
  if (!emptyFormActions) {
    emptyFormActions = {
      addInput: () => {},
      removeInput: () => {},
      updateInput: () => {},
      formDisplayErrors: ref(false),
    };
  }
  return emptyFormActions;
}

export type SimpleValidation = (value: any) => true | string;

export type Validations =
  | Ref<AnySchema[]>
  | Ref<readonly AnySchema[]>
  | AnySchema[]
  | SimpleValidation[]
  | Ref<SimpleValidation[]>;

const useFormControl = <T>(
  props: { modelValue?: T; formatter?: Function },
  name?: string,
  ignored: boolean | Ref<boolean> = false,
  validations?: Validations
) => {
  const formActions = inject(FORM_INJECTION, getEmptyFormActions());

  name = name || createId('update:modelValue');

  const ignoredRef = isRef(ignored) ? ignored : ref(ignored);

  const formattedValue =
    props.formatter && props.modelValue ? props.formatter(props.modelValue) : props.modelValue;

  const errors = ref<ValidationErrorItem[] | string | null>(getErrors(formattedValue));
  const valid = computed(() => !errors.value || errors.value.length === 0);

  function getErrors(val: any) {
    const tests = isRef(validations) ? validations.value : validations;
    if (!tests) return null;

    for (let i = 0; i < tests?.length; i++) {
      if (isSimpleValidationType(tests[i])) {
        const test = tests[i] as SimpleValidation;
        const result = test(val);
        if (typeof result === 'string') return result;
      } else {
        const test = tests[i] as AnySchema;
        const result = test.validate(val);
        if (result.error) return result.error.details;
      }
    }

    return null;
  }

  function isSimpleValidationType(
    validation: AnySchema | SimpleValidation
  ): validation is SimpleValidation {
    return !('validate' in validation);
  }

  watch(
    () => [props.modelValue, isRef(validations) ? validations.value : validations],
    ([val]) => {
      errors.value = getErrors(val);
      formActions.updateInput(name! as DataKeys, val, !errors.value);
    }
  );

  onMounted(() => {
    formActions.addInput(props.modelValue, valid.value, name! as DataKeys, ignoredRef.value);
  });

  onUnmounted(() => {
    formActions.removeInput(name! as DataKeys);
  });

  return {
    valid,
    errors,
    formDisplayErrors: formActions.formDisplayErrors,
    ignored: ignoredRef,
  };
};

export default useFormControl;
