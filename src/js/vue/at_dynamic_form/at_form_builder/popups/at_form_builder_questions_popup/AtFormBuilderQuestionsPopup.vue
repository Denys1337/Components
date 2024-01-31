<template>
  <AtPopup
    class="AtFormBuilderQuestionsPopup"
    show-close-icon
    show-confirmation-buttons
    current-size="small"
    :show="show"
    :title-text="titleText"
    :confirm-disabled="
      !selectedQuestionType ||
      !questionText ||
      questionText.length > QUESTION_MAX_LENGTH ||
      !!idError
    "
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    :disable-click-away="disableClickAway"
    :show-divider-line="showDividerLine"
    @ok="onSubmit"
    @close="$emit('close')"
  >
    <section class="block-start-06">
      <AtTextArea
        ref="atTextAreaEl"
        class="question-area w-100"
        v-model="questionText"
        :title="$t('form_builder.question')"
        :maxlength="QUESTION_MAX_LENGTH"
      />
    </section>
    <section class="questions-types d-flex jc-space-between pad-block-start-06">
      <section
        class="question-type"
        v-for="questionType of questionsTypesConfiguration"
        :key="questionType.title"
      >
        <h3 class="question-type-label font-body-default block-end-04">
          {{ questionType.title }}
        </h3>
        <SelectorGroup
          v-model="selectedQuestionType"
          :name="name"
          :options="questionType.questionsSubtypes"
          full-width
        />
      </section>
    </section>
    <AtFormBuilderAdvancedSettings
      v-if="enableAdvancedEdit"
      v-model:id="questionId"
      :existing-ids="filteredExistingIds"
      v-model:error="idError"
    />
  </AtPopup>
</template>
<script lang="ts">
  import {
    defineComponent,
    ref,
    PropType,
    nextTick,
    computed,
    inject,
    defineAsyncComponent,
  } from 'vue';

  import { nanoid } from 'nanoid';

  import AtPopup from '../../../../at_popup/AtPopup.vue';
  import { atPopupVueProps } from '../../../../at_popup/types';
  import AtTextArea from '../../../../at_textarea/AtTextarea.vue';
  import { Locales } from '../../../../at_translations/types';
  import SelectorGroup from '../../../../selector_group/SelectorGroup.vue';
  import { AtQuestionType } from '../../../types';
  import { AtFormBuilderQuestion } from '../../types';
  import { filterMap, QuestionModel } from '../../utils';
  import { QUESTION_MAX_LENGTH, AtFormBuilderQuestionType } from './types';

  const AtFormBuilderAdvancedSettings = defineAsyncComponent(
    () =>
      import(
        /* webpackChunkName: "AtFormBuilderAdvancedSettings" */ '../../components/at_form_builder_advanced_settings/AtFormBuilderAdvancedSettings.vue'
      )
  );

  export default defineComponent({
    name: 'AtFormBuilderQuestionsPopup',
    components: {
      AtTextArea,
      AtPopup,
      SelectorGroup,
      AtFormBuilderAdvancedSettings,
    },
    props: {
      ...atPopupVueProps,
      questionsTypesConfiguration: {
        type: Array as PropType<AtFormBuilderQuestionType[]>,
        required: true,
      },
      name: { type: String, required: true },
      existingElementsIds: {
        type: Map as PropType<Map<string, any>>,
        default: () => new Map(),
        required: false,
      },
      questionToEdit: { type: Object as PropType<AtFormBuilderQuestion>, required: false },
      enableAdvancedEdit: { type: Boolean, default: false },
    },
    emits: ['create', 'close', 'edit'],
    setup(props, { emit }) {
      const locale = inject('language', 'en') as Locales;

      const questionText = ref(props.questionToEdit?.title[locale] || '');
      const initialQuestionId = props.questionToEdit?.id || nanoid();
      const questionId = ref<string>(initialQuestionId);

      const filteredExistingIds = computed(() =>
        filterMap(initialQuestionId, props.existingElementsIds)
      );
      const idError = ref(undefined);

      const selectedQuestionType = ref<undefined | AtQuestionType>(
        props.questionToEdit ? props.questionToEdit.fieldType : undefined
      );
      const atTextAreaEl = ref<InstanceType<typeof AtTextArea>>();
      nextTick(() => atTextAreaEl?.value?.focusTextArea());

      const onSubmit = () => {
        const newQuestion = QuestionModel(
          questionText.value,
          locale,
          questionId.value,
          selectedQuestionType.value!
        );
        if (!props.questionToEdit) {
          emit('create', newQuestion);
          return;
        }
        emit('edit', { ...props.questionToEdit, ...newQuestion });
      };

      return {
        questionId,
        questionText,
        selectedQuestionType,
        QUESTION_MAX_LENGTH,
        atTextAreaEl,
        idError,
        onSubmit,
        filteredExistingIds,
      };
    },
  });
</script>
<style lang="scss">
  @import '../../../../../../style/scss/base_functions';

  .AtFormBuilderQuestionsPopup {
    .question-area {
      max-width: pxToRem(480);
      textarea {
        resize: none;
      }
    }
    .question-type {
      width: calc((100% - var(--spacing-07)) / 3);
    }
  }
</style>
