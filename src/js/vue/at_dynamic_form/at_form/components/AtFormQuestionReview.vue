<template>
  <AtFormQuestion
    class="AtFormQuestionReview w-100"
    v-bind="{ ...$attrs, ...$props }"
    v-on="formListeners"
    v-model="model"
  >
    <template #nav-buttons>
      <AtFormQuestionReviewButtons
        class="d-flex block-start-07 jc-center"
        v-model="statusSelectorModel"
        :disabled="questionButtonsDisabled || !modelValue"
      />
    </template>
  </AtFormQuestion>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType, SetupContext } from 'vue';

  import useAtFormQuestionListeners from '../hooks/useAtFormQuestionListeners';
  import { AtQuestionStatus } from '../types';
  import AtFormQuestion from './at_form_question_wrapper/AtFormQuestionWrapper.vue';
  import AtFormQuestionReviewButtons from './at_form_question_wrapper/buttons/AtFormQuestionReviewButtons.vue';
  export default defineComponent({
    name: 'AtFormQuestionReview',
    components: {
      AtFormQuestion,
      AtFormQuestionReviewButtons,
    },
    props: {
      modelValue: {
        type: String,
      },
      status: {
        type: String as PropType<AtQuestionStatus>,
        default: () => '',
      },
      questionButtonsDisabled: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['status-change', 'load-file-src', 'update:modelValue', 'show-add-note-popup'],
    setup(props, context: SetupContext) {
      const statusSelectorModel = computed<AtQuestionStatus>({
        get: () => props.status,
        set: (value) => {
          context.emit('status-change', value);
        },
      });

      const model = computed({
        get: () => props.modelValue,
        set: (value) => {
          context.emit('update:modelValue', value);
        },
      });

      const formListeners = useAtFormQuestionListeners(context);

      return {
        statusSelectorModel,
        model,
        formListeners,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .AtFormQuestionReview {
    &-wrapper {
      border-radius: var(--spacing-02);
      background: var(--white);
      transition: box-shadow 250ms ease-in-out;
      border: 1px solid var(--gray-400);

      &:hover {
        box-shadow: inset 0 1px 0 var(--gray-400);
      }
    }

    &-number {
      background-color: var(--pri-500);
      color: var(--white);
      border-radius: 5rem;
      min-width: var(--spacing-09);
      width: fit-content;
    }

    &-add-notes {
      border-top: 1px solid var(--gray-400);
    }

    &-mandatory {
      color: var(--red-500);
    }

    &-tooltip {
      color: var(--gray-800);
      vertical-align: middle;
    }
  }
</style>
