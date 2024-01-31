import { ref, watch } from 'vue';

import { AnySchema } from 'joi';

import { InputType } from '../at_input/types';
import { validationByPropsFactory } from '../at_input/validations';

export interface UseInputRulesParams {
  rules?: AnySchema[];
  type?: InputType;
  maxlength: number;
  minlength: number;
  minNumber?: number;
  maxNumber?: number;
  required: boolean;
}

const useInputRules = (params: UseInputRulesParams) => {
  const rules = ref<AnySchema[]>([]);

  watch(
    () => [
      params.type,
      params.maxlength,
      params.minlength,
      params.required,
      params.maxNumber,
      params.minNumber,
      params.rules,
    ],
    () => {
      rules.value = params.rules ? params.rules : [validationByPropsFactory(params)];
    },
    { immediate: true }
  );

  return { rules };
};

export default useInputRules;
