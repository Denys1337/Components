<template>
  <AtTextarea
    :name="id"
    v-model="model"
    :maxlength="settings.max ?? DEFAULT_MAX_LENGTH_LONG"
    :placeholder="$t('certifications.execution.long_text_placeholder')"
    :disabled="questionButtonsDisabled"
  />
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import AtTextarea from '../../../../../at_textarea/AtTextarea.vue';
  import { AtFormQuestionProps } from '../../../../types';
  import { DEFAULT_MAX_LENGTH_LONG } from '../constants';

  export default defineComponent({
    name: 'AtFormLongTextQuestion',
    components: {
      AtTextarea,
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
        DEFAULT_MAX_LENGTH_LONG,
      };
    },
  });
</script>
<style lang="scss" scoped></style>
