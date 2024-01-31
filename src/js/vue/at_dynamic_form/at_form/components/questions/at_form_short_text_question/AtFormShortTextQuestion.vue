<template>
  <AtInput
    :name="id"
    v-model="model"
    :maxlength="settings.max ?? DEFAULT_MAX_LENGTH_SHORT"
    :placeholder="$t('certifications.execution.short_text_placeholder')"
    :disabled="questionButtonsDisabled"
  />
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import AtInput from '../../../../../at_input/AtInput.vue';
  import { AtFormQuestionProps } from '../../../../types';
  import { DEFAULT_MAX_LENGTH_SHORT } from '../constants';
  export default defineComponent({
    name: 'AtFormShortTextQuestion',
    components: {
      AtInput,
    },
    props: AtFormQuestionProps,
    emits: ['update:modelValue'],
    setup(props, context) {
      const model = computed<string>({
        get: () => props.modelValue,
        set: (value) => {
          context.emit('update:modelValue', value);
        },
      });
      return {
        model,
        props,
        DEFAULT_MAX_LENGTH_SHORT,
      };
    },
  });
</script>
<style lang="scss" scoped></style>
