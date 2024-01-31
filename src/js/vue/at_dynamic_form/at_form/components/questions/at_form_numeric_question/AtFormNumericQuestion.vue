<template>
  <AtInput
    type="number"
    :placeholder="$t('certifications.execution.numeric_text_placeholder')"
    :min-number="settings.min"
    :max-number="settings.max"
    v-model="model"
    :formatter="formatValue"
    :disabled="questionButtonsDisabled"
  />
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';

  import AtInput from '../../../../../at_input/AtInput.vue';
  import { AtFormQuestionProps } from '../../../../types';

  export default defineComponent({
    name: 'AtFormNumericQuestion',
    components: {
      AtInput,
    },
    props: {
      ...AtFormQuestionProps,
      modelValue: {
        type: String,
        default: '',
      },
    },
    emits: ['update:modelValue'],
    setup(props, context) {
      const model = computed<string>({
        get: () => props.modelValue,
        set: (value) => {
          context.emit('update:modelValue', value);
        },
      });

      const formatValue = (value: string): string => {
        let localValue = value;

        if (value.length >= 16) {
          localValue = value.slice(0, -1);
        }

        if (localValue === '.') {
          localValue = '0.';
        }

        return (localValue ? parseFloat(localValue) : localValue) + '';
      };
      return {
        model,
        props,
        formatValue,
      };
    },
  });
</script>
<style lang="scss"></style>
