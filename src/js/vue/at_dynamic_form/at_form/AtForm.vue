<template>
  <div class="AtForm">
    <Component :is="component" v-bind="componentProps" v-model="model" v-on="formListeners">
      <template #actions>
        <slot name="actions" :model-value="model"></slot>
      </template>
    </Component>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType, SetupContext } from 'vue';

  import { ArrowNarrowLeftIcon } from 'vue-tabler-icons';

  import AtButton from '../../at_button/AtButton.vue';
  import { FieldValue } from '../types';
  import AtFormQuestion from './AtFormQuestion.vue';
  import AtFormSection from './AtFormSection.vue';
  import useAtFormQuestionListeners from './hooks/useAtFormQuestionListeners';
  import {
    defaultAtFormQuestionTypeComponentMap,
    AtFormSubSectionOrQuestion,
    AtFormElementTypeComponentMapType,
    AtFormElementType,
  } from './types';

  export const AtFormElementTypeComponentMap: AtFormElementTypeComponentMapType = {
    [AtFormElementType.Field]: AtFormQuestion,
    [AtFormElementType.Section]: AtFormSection,
  };

  export default defineComponent({
    name: 'AtForm',
    components: {
      AtButton,
      ArrowNarrowLeftIcon,
    },
    props: {
      element: {
        type: Object as PropType<AtFormSubSectionOrQuestion>,
        required: true,
      },
      questionHierarchyText: {
        type: String,
      },
      modelValue: {
        type: [String, Object] as PropType<FieldValue>,
        required: true,
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
      const component = computed(() => AtFormElementTypeComponentMap[props.element.type]);
      const componentProps = computed(() => {
        const elementKey = props.element.type === AtFormElementType.Field ? 'question' : 'section';

        return { ...props, ...context.attrs, [elementKey]: props.element };
      });

      const model = computed({
        get: () => props.modelValue,
        set: (value) => {
          context.emit('update:modelValue', value);
        },
      });
      const formListeners = useAtFormQuestionListeners(context as SetupContext);

      return {
        model,
        defaultAtFormQuestionTypeComponentMap,
        formListeners,
        component,
        componentProps,
      };
    },
  });
</script>

<style lang="scss">
  .AtForm {
    .back-arrow-icon {
      body[dir='rtl'] & {
        transform: rotate(180deg);
      }
    }
  }
</style>
