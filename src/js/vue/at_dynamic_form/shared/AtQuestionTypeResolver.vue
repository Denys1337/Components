<template>
  <div class="AtQuestionTypeResolver">
    <Component
      :is="getComponent(question.fieldType)"
      :key="question.id"
      v-bind="{ ...$attrs, ...question }"
      v-model="model"
    />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType, Component } from 'vue';

  import { defaultAtFormBuilderTypeComponentMap } from '../at_form_builder/constants';
  import { AtFormBuilderQuestion } from '../at_form_builder/types';
  import { AtQuestionType, AtQuestionTypeComponentMap } from '../types';

  export default defineComponent({
    name: 'AtQuestionTypeResolver',
    props: {
      questionTypeComponentMap: {
        type: Object as PropType<AtQuestionTypeComponentMap>,
        default: () => defaultAtFormBuilderTypeComponentMap,
      },
      question: {
        type: Object as PropType<AtFormBuilderQuestion>,
        required: true,
      },
      modelValue: {
        type: [String, Object],
        required: true,
      },
    },
    emits: ['update:modelValue'],
    setup(props, context) {
      const model = computed<string | object>({
        get: () => props.modelValue,
        set: (value: string | object) => {
          context.emit('update:modelValue', value);
        },
      });
      function getComponent(componentType: AtQuestionType): Component {
        return props.questionTypeComponentMap[componentType];
      }

      return {
        getComponent,
        model,
      };
    },
  });
</script>
