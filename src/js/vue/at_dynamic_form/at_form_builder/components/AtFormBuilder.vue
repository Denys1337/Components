<template>
  <section class="AtFormBuilder d-flex flex-column inline-start-10 d-flex block-start-07">
    <slot name="empty-state" v-if="!sections.length"></slot>
    <div class="d-flex flex-column" v-if="selectedSectionModel">
      <template v-if="selectedSectionModel.sections">
        <AtFormBuilderStack
          v-for="(subSection, index) in selectedSectionModel.sections"
          :key="subSection.id"
          v-bind="{ ...$attrs, ...$props, ...subSection }"
          :question-type-component-map="defaultAtFormBuilderTypeComponentMap"
          :question-menu-list="questionMenuList"
          :translation-path="translationPath"
          v-model="selectedSectionModel.sections[index]"
          @edit-question="$emit('edit-question', { ...$event, subsectionIndex: index })"
          @delete-question="
            $emit('delete-question', {
              ...$event,
              subsectionIndex: index,
            })
          "
          @add-question="$emit('add-question', { subsectionIndex: index })"
          @rename-question="
            $emit('rename-question', {
              ...$event,
              subsectionIndex: index,
            })
          "
          @delete-stack="$emit('delete-stack', $event)"
          @rename-stack="$emit('rename-stack', $event)"
          @edit-question-options="
            $emit('edit-question-options', {
              ...$event,
              subsectionIndex: index,
            })
          "
        />
      </template>

      <AtFormBuilderQuestion
        v-for="(question, index) in selectedSectionModel.fields"
        :key="question.id"
        :question="question"
        v-model="selectedSectionModel.fields[index]"
        :question-menu-list="questionMenuList"
        class="block-end-02"
        @edit-question="
          $emit('edit-question', {
            question,
            questionIndex: index,
          })
        "
        @delete-question="
          $emit('delete-question', {
            question,
            questionIndex: index,
          })
        "
        @rename-question="
          $emit('rename-question', {
            title: $event,
            question,
            questionIndex: index,
          })
        "
        @edit-question-options="
          $emit('edit-question-options', {
            question,
            questionIndex: index,
          })
        "
      >
        <AtQuestionTypeResolver
          :question="question"
          v-bind="$attrs"
          v-model="selectedSectionModel.fields[index]"
          :question-type-component-map="questionTypeComponentMap"
        />
      </AtFormBuilderQuestion>
    </div>
    <slot name="add-question" v-if="sections && sections.length"></slot>
  </section>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import { MenuItemList } from '../../../at_menu/types';
  import AtQuestionTypeResolver from '../../shared/AtQuestionTypeResolver.vue';
  import { AtQuestionTypeComponentMap } from '../../types';
  import { defaultAtFormBuilderTypeComponentMap } from '../constants';
  import { AtFormBuilderSection } from '../types';
  import AtFormBuilderQuestion from './at_form_builder_question/AtFormBuilderQuestion.vue';
  import { QuestionMenuListItem } from './at_form_builder_question/types';
  import AtFormBuilderStack from './at_form_builder_stack/AtFormBuilderStack.vue';

  export default defineComponent({
    name: 'AtFormBuilder',
    components: {
      AtQuestionTypeResolver,
      AtFormBuilderStack,
      AtFormBuilderQuestion,
    },
    props: {
      sections: {
        type: Array as PropType<AtFormBuilderSection[]>,
        default: () => [],
      },
      selectedSection: {
        type: Object as PropType<AtFormBuilderSection>,
      },
      questionMenuList: {
        type: Array as PropType<QuestionMenuListItem[]>,
      },
      enableAdvancedEdit: {
        type: Boolean,
        default: false,
      },
      questionTypeComponentMap: {
        type: Object as PropType<AtQuestionTypeComponentMap>,
        default: () => defaultAtFormBuilderTypeComponentMap,
      },
      stackMenuList: {
        type: Array as PropType<MenuItemList>,
      },
      translationPath: {
        type: String,
        default: 'form_builder',
      },
      existingElementsIds: {
        type: Map as PropType<Map<string, any>>,
        default: () => new Map(),
        required: false,
      },
    },
    emits: [
      'show-add-question-modal',
      'update:modelValue',
      'edit-question',
      'delete-question',
      'rename-question',
      'add-question',
      'rename-stack',
      'delete-stack',
      'edit-question-options',
    ],
    setup(props, { emit }) {
      const selectedSectionModel = computed({
        get: () => props.selectedSection,
        set: (value) => {
          // FIXME: This isn't handled in the parent component
          // https://agritask.myjetbrains.com/youtrack/issue/PLAT-2987/Form-builder-make-sure-everything-is-updated-on-user-interaction
          emit('update:modelValue', value);
        },
      });

      return {
        defaultAtFormBuilderTypeComponentMap,
        selectedSectionModel,
        AtFormBuilderQuestion,
      };
    },
  });
</script>
<style lang="scss">
  .AtFormBuilder {
    .AtFormBuilderStack {
      margin-block-end: var(--spacing-02);
    }
  }
</style>
