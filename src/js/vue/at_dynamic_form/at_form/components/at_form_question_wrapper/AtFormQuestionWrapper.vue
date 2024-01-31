<template>
  <section class="AtFormQuestionWrapper">
    <div :class="wrapperClassList">
      <div class="pad-inline-start-07 pad-inline-end-10">
        <span
          class="
            font-body-small-b
            AtFormQuestionWrapper-number
            pad-02
            text-align-center
            d-block
            block-end-04
          "
          v-if="questionHierarchyText"
          >{{ questionHierarchyText }}</span
        >
        <p class="font-body-default-b AtFormQuestionWrapper-text block-end-04">
          {{ question.title }}
          <span class="AtFormQuestionWrapper-mandatory" v-if="question.settings.required">*</span>
          <span class="AtFormQuestionWrapper-tooltip inline-start-01" v-if="tooltipText">
            <InfoCircleIcon size="24" />
          </span>
        </p>
        <div class="pad-block-end-06">
          <DynamicField
            :custom-field-component-map="questionTypeComponentMap"
            :type="question.fieldType"
            :field-props="question"
            v-model="model"
            v-bind="$props"
          />
        </div>
      </div>

      <div
        class="AtFormQuestionWrapper-add-notes pad-block-start-04 pad-inline-07"
        v-if="showNotes"
      >
        <div class="add-notes d-flex pointer text-pri-500">
          <AtButton :visual="ButtonVisual.tertiary" @click="$emit('show-add-note-popup')">
            <template #start
              ><MessagePlusIcon size="24" class="as-center inline-end-02" />
              <span class="font-body-default as-center">{{
                $t('certifications.execution.add_notes_photos')
              }}</span>
            </template>
          </AtButton>
        </div>
        <AtFormElementNotes
          :notes="question.notes"
          v-if="question.notes.length"
          @load-file-src="$emit('load-file-src', $event)"
        />
      </div>
    </div>

    <div class="block-start-07" v-if="$slots['nav-buttons']">
      <slot name="nav-buttons"> </slot>
    </div>
  </section>
</template>
<script lang="ts">
  import { computed, defineComponent, inject, PropType, SetupContext } from 'vue';

  import { InfoCircleIcon, MessagePlusIcon } from 'vue-tabler-icons';

  import AtButton from '../../../../at_button/AtButton.vue';
  import { ButtonVisual } from '../../../../at_button/types';
  import DynamicField from '../../../../dynamic_field/DynamicField.vue';
  import { FieldComponentMap } from '../../../../dynamic_field/types';
  import { FieldValue, QUESTION_COMPONENT_MAP } from '../../../types';
  import {
    AtQuestionStatus,
    defaultAtFormQuestionTypeComponentMap,
    AtFormQuestion,
  } from '../../types';
  import AtFormElementNotes from '../at_form_question_notes/AtFormElementNotes.vue';

  export default defineComponent({
    name: 'AtFormQuestionWrapper',
    components: {
      DynamicField,
      MessagePlusIcon,
      InfoCircleIcon,
      AtFormElementNotes,
      AtButton,
    },
    props: {
      questionHierarchyText: {
        type: String,
        required: false,
      },
      modelValue: {
        type: [String, Object] as PropType<FieldValue>,
      },
      status: {
        type: String as PropType<AtQuestionStatus>,
        default: () => '',
      },

      showNotes: {
        type: Boolean,
        default: true,
      },
      wrapperClassList: {
        type: Array as PropType<string[]>,
        default: () => [
          'AtFormQuestionWrapper-wrapper',
          'pad-block-06',
          'elevation-level-01',
          'block-05',
        ],
      },
      question: {
        type: Object as PropType<AtFormQuestion>,
        required: true,
      },
    },
    emits: [
      'status-change',
      'update:modelValue',
      'submit',
      'next',
      'back',
      'load-file-src',
      'show-add-note-popup',
    ],
    setup(props, context: SetupContext) {
      const questionTypeComponentMap = inject<FieldComponentMap>(
        QUESTION_COMPONENT_MAP,
        defaultAtFormQuestionTypeComponentMap
      );
      const locale = 'en';
      const tooltipText = computed(() => props.question.toolTip?.[locale]);
      const model = computed({
        get: () => props.modelValue,
        set: (value) => {
          context.emit('update:modelValue', value);
        },
      });

      return {
        AtQuestionStatus,
        tooltipText,
        questionTypeComponentMap,
        model,
        ButtonVisual,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .AtFormQuestionWrapper {
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
