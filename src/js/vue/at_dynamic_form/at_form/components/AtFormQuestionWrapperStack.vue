<template>
  <AtFormQuestionWrapper
    class="AtFormQuestionWrapperStack w-100 border-block-start border-gray-400"
    v-bind="{ ...$props, ...$attrs }"
    :id="question.id"
    :field-type="question.fieldType"
    :title="question.title"
    v-on="formListeners"
    v-model="model"
    :show-notes="false"
    :question-hierarchy-text="undefined"
    :wrapper-class-list="['AtFormQuestionWrapperStack-wrapper', 'block-start-06']"
  />
</template>
<script lang="ts">
  import { computed, defineComponent, PropType, SetupContext } from 'vue';

  import { FieldValue } from '../../types';
  import useAtFormQuestionListeners from '../hooks/useAtFormQuestionListeners';
  import { AtFormQuestion, AtQuestionStatus } from '../types';
  import AtFormQuestionWrapper from './at_form_question_wrapper/AtFormQuestionWrapper.vue';

  export default defineComponent({
    name: 'AtFormQuestionWrapperStack',
    components: {
      AtFormQuestionWrapper,
    },
    props: {
      modelValue: {
        type: [String, Object] as PropType<FieldValue>,
      },
      status: {
        type: String as PropType<AtQuestionStatus>,
        default: () => '',
      },
      questionButtonsDisabled: {
        type: Boolean,
        default: false,
      },
      question: {
        type: Object as PropType<AtFormQuestion>,
        required: true,
      },
    },
    emits: ['status-change', 'load-file-src', 'update:modelValue', 'show-add-note-popup'],
    setup(props, context: SetupContext) {
      const model = computed({
        get: () => props.modelValue,
        set: (value) => {
          context.emit('update:modelValue', value);
        },
      });

      const formListeners = useAtFormQuestionListeners(context);

      return {
        model,
        formListeners,
      };
    },
  });
</script>
<style lang="scss">
  .AtFormQuestionWrapperStack {
    &:first-of-type {
      border: none;
    }

    &-wrapper .AtFormQuestionWrapper-wrapper {
      border: none;
    }
  }
</style>
