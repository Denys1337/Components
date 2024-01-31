<template>
  <div class="AtFormQuestion">
    <Component
      :is="questionWrapperComponent"
      v-bind="{ ...$attrs, ...$props, ...question }"
      v-model="model"
      v-on="formListeners"
    />
    <slot name="actions"></slot>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType, SetupContext } from 'vue';

  import { ArrowNarrowLeftIcon } from 'vue-tabler-icons';

  import AtButton from '../../at_button/AtButton.vue';
  import useAtFormQuestionListeners from './hooks/useAtFormQuestionListeners';
  import {
    AtFormQuestion,
    AtFormWrapperType,
    AtFormQuestionWrapperTypeMap,
    AtFormQuestionWrapperTypeMapType,
  } from './types';

  export default defineComponent({
    name: 'AtFormQuestion',
    components: {
      AtButton,
      ArrowNarrowLeftIcon,
    },
    props: {
      question: {
        type: Object as PropType<AtFormQuestion>,
        required: true,
      },
      questionHierarchyText: {
        type: String,
        required: false,
      },
      isBackButtonDisabled: {
        type: Boolean,
        default: false,
      },
      showTopBackButton: {
        type: Boolean,
        default: false,
      },
      modelValue: {
        type: [String, Object],
        required: true,
      },
      questionWrapperComponentType: {
        type: String as PropType<AtFormWrapperType>,
        default: AtFormWrapperType.Default,
      },
      questionWrapperComponentTypeMap: {
        type: Object as PropType<AtFormQuestionWrapperTypeMapType>,
        default: () => ({}),
      },
    },
    emits: [
      'update:modelValue',
      'status-change',
      'back',
      'load-file-src',
      'next',
      'submit',
      'show-add-note-popup',
    ],
    setup(props, context) {
      const model = computed({
        get: () => props.modelValue,
        set: (value) => {
          context.emit('update:modelValue', value);
        },
      });
      const formListeners = useAtFormQuestionListeners(context as SetupContext);

      const questionWrapperMap: AtFormQuestionWrapperTypeMapType = {
        ...AtFormQuestionWrapperTypeMap,
        ...props.questionWrapperComponentTypeMap,
      };

      const questionWrapperComponent = questionWrapperMap[props.questionWrapperComponentType];

      return {
        model,
        formListeners,
        questionWrapperComponent,
        AtFormWrapperType,
      };
    },
  });
</script>

<style lang="scss">
  .AtFormQuestion {
    .back-arrow-icon {
      body[dir='rtl'] & {
        transform: rotate(180deg);
      }
    }
  }
</style>
