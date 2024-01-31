<template>
  <form
    class="AtFormControl"
    :autocomplete="autocomplete ? 'on' : 'off'"
    novalidate
    @submit.prevent
  >
    <slot></slot>
  </form>
</template>

<script lang="ts">
  import { computed, defineComponent, provide, ref, watch } from 'vue';

  import { FormActions, FORM_INJECTION, FormControlChangeData, DataKeys } from './types';

  export default defineComponent({
    name: 'AtFormcontrol',
    props: {
      showErrors: { type: Boolean, default: false },
      autocomplete: { type: Boolean, default: true },
    },
    emits: ['change', 'valid'],
    setup(props, { emit }) {
      const inputs = ref<FormControlChangeData>({} as FormControlChangeData);
      const allAreValid = ref<boolean | undefined>();
      const formDisplayErrors = computed(() => !!props.showErrors);

      watch(
        () => inputs.value,
        (inputs) => emit('change', { ...inputs }),
        { deep: true }
      );

      watch(
        () => allAreValid.value,
        (valid) => emit('valid', valid)
      );

      const calculateAllValid = () => {
        allAreValid.value = !Object.values(inputs.value).find(
          ({ valid, ignored }) => !ignored && !valid
        );
      };

      const actions: FormActions = {
        addInput: (value, valid, name: DataKeys, ignored) => {
          // maybe in real Vue 3 or updating the plugin to version 1.0.x could be used without destructing:
          inputs.value[name] = {
            value,
            valid,
            ignored,
          };

          calculateAllValid();
        },

        removeInput: (name: DataKeys) => {
          const clone = { ...inputs.value };
          delete clone[name];
          inputs.value = clone;
          calculateAllValid();
        },

        updateInput: (name: DataKeys, value: any, valid: boolean) => {
          if (inputs.value[name]) {
            inputs.value[name].value = value;
            inputs.value[name].valid = valid;
          }
          calculateAllValid();
        },

        formDisplayErrors,
      };

      provide(FORM_INJECTION, actions);

      return {
        inputs,
        allAreValid,
      };
    },
  });
  /*
// component
needs to know when invalid
needs to know if to show an error
needs to inform when validation is disabled ()
can have a unique name

// form
needs to know which inputs are valid / invalid
needs to tell invalid to show error
needs to emit events: valid / invalid
can keep track of mounted/unmounted inabled/disabled inputs


*/
</script>
