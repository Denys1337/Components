<template>
  <AtFormStackWrapper class="AtFormStackSection">
    <AtFormStackHeader
      :question-hierarchy-text="questionHierarchyText"
      :show-remove-button="showRemoveButton"
      :title="section.title"
      @remove-stack="$emit('remove-stack')"
    />

    <AtFormQuestionWrapperStack
      class="block-00"
      v-for="element in section.fields"
      :key="element.id"
      :question="getComponentProps(element)"
      :question-wrapper-component-type="AtFormWrapperType.Stack"
      :model-value="modelValue[element.id]"
      @update:model-value="handleModelValueUpdate($event, element.id)"
    />

    <div class="add-notes d-flex pointer text-pri-500">
      <AtButton
        @click="$emit('show-add-note-popup')"
        :visual="ButtonVisual.tertiary"
        class="inline-start-07 block-start-04"
      >
        <template #start>
          <MessagePlusIcon size="24" class="as-center inline-end-02" />
          <span class="font-body-default as-center">{{
            $t('certifications.execution.add_notes_photos')
          }}</span>
        </template>
      </AtButton>
    </div>
    <AtFormElementNotes
      v-if="section.notes?.length"
      :notes="section.notes"
      @load-file-src="$emit('load-file-src', $event)"
      class="pad-inline-06"
    />
  </AtFormStackWrapper>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import { MessagePlusIcon } from 'vue-tabler-icons';

  import AtFormStackHeader from './parts/AtFormStackHeader.vue';
  import AtFormStackWrapper from './parts/AtFormStackWrapper.vue';
  import AtButton from '../../../../../at_button/AtButton.vue';
  import { ButtonVisual } from '../../../../../at_button/types';
  import { FieldValue } from '../../../../types';
  import { AtFormQuestion, AtFormWrapperType, IAtFormSubSection } from '../../../types';
  import AtFormQuestionWrapperStack from '../../AtFormQuestionWrapperStack.vue';
  import AtFormElementNotes from '../../at_form_question_notes/AtFormElementNotes.vue';

  export default defineComponent({
    name: 'AtFormStackSection',
    components: {
      AtFormQuestionWrapperStack,
      MessagePlusIcon,
      AtFormElementNotes,
      AtButton,
      AtFormStackHeader,
      AtFormStackWrapper,
    },
    props: {
      section: {
        type: Object as PropType<IAtFormSubSection>,
        required: true,
      },
      modelValue: {
        type: Object as PropType<Record<string, FieldValue>>,
        required: true,
      },
      questionHierarchyText: {
        type: String,
      },
      showRemoveButton: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['update:modelValue', 'remove-stack', 'show-add-note-popup', 'load-file-src'],
    setup(props, { attrs, emit }) {
      const getComponentProps = (element: AtFormQuestion) => ({
        ...attrs,
        ...props,
        ...element,
        showNotes: false,
      });

      const handleModelValueUpdate = (value: FieldValue, fieldId: string) => {
        emit('update:modelValue', {
          ...props.modelValue,
          [fieldId]: value,
        });
      };

      return { getComponentProps, AtFormWrapperType, ButtonVisual, handleModelValueUpdate };
    },
  });
</script>
<style lang="scss" scoped>
  @import '../../../../../../../style/scss/vars';
  .AtFormStackSection {
    min-width: 360px;
    max-width: $max-form-width;
    scroll-margin-top: 72px;

    .add-notes {
      border-top: 1px solid;
      border-color: var(--gray-400);
    }
  }
</style>
