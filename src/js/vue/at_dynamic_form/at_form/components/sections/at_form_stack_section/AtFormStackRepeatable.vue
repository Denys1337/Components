<template>
  <div class="AtFormStackRepeatable">
    <AtFormStackWrapper v-if="presentEmptyStack">
      <AtFormStackHeader
        class="repeat-stack-wrapper"
        :question-hierarchy-text="questionHierarchyText"
        :title="section.title"
      />
    </AtFormStackWrapper>

    <template v-else>
      <div class="block-end-02" v-for="(_, index) in modelValue" :key="section.id + index">
        <AtFormStackSection
          v-bind="{ ...$props, ...$attrs }"
          :show-remove-button="!isMandatory || modelValue.length > 1"
          :question-hierarchy-text="getStackHierarchyText(index)"
          @show-add-note-popup="$emit('show-add-note-popup', index)"
          @remove-stack="removeStack(index)"
          :model-value="modelValue[index]"
          @update:model-value="handleModelValueUpdate($event, index)"
          :id="section.id + index"
        />
      </div>
    </template>

    <AtCard
      class="repeat-stack-wrapper d-flex elevation-level-01"
      @card-click="addStack"
      extended
      :show-default-add-card="false"
      clickable
    >
      <template #text>
        <div class="d-flex ai-center text-pri-500">
          <AtButton :visual="ButtonVisual.tertiary">
            <template #start>
              <RepeatIcon />
            </template>
            {{ $t('dynamic_form.repeat_stack') }}
          </AtButton>
        </div>
      </template>
    </AtCard>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed } from 'vue';

  import { RepeatIcon } from 'vue-tabler-icons';

  import AtFormStackSection from './AtFormStackSection.vue';
  import AtFormStackHeader from './parts/AtFormStackHeader.vue';
  import AtFormStackWrapper from './parts/AtFormStackWrapper.vue';
  import AtButton from '../../../../../at_button/AtButton.vue';
  import { ButtonVisual } from '../../../../../at_button/types';
  import AtCard from '../../../../../at_card/AtCard.vue';
  import { UnitNumericModelValue } from '../../../../types';
  import { IAtFormSubSection } from '../../../types';

  export default defineComponent({
    name: 'AtFormStackRepeatable',
    components: {
      AtFormStackSection,
      RepeatIcon,
      AtButton,
      AtFormStackWrapper,
      AtFormStackHeader,
      AtCard,
    },
    props: {
      section: {
        type: Object as PropType<IAtFormSubSection>,
        required: true,
      },
      modelValue: {
        type: Array as PropType<Record<string, UnitNumericModelValue | string>[]>,
        default: () => [{}],
      },
      questionHierarchyText: {
        type: String,
      },
    },
    emits: ['update:modelValue', 'remove-stack', 'add-stack', 'show-add-note-popup'],
    setup(props, { emit }) {
      const handleModelValueUpdate = (
        event: Record<string, UnitNumericModelValue | string>,
        stackIndex: number
      ) => {
        const value = [...props.modelValue];
        value[stackIndex] = event;

        emit('update:modelValue', value);
      };

      const addStack = () => {
        emit('add-stack');
      };

      const removeStack = (index: number) => {
        emit('remove-stack', index);
      };

      const getStackHierarchyText = (index: number) =>
        `${props.questionHierarchyText}(${index + 1})`;

      const isMandatory = computed(() => props.section.settings.minStack > 0);

      const presentEmptyStack = computed(
        () => !isMandatory.value && typeof props.modelValue[0] !== 'object'
      );

      return {
        addStack,
        removeStack,
        getStackHierarchyText,
        handleModelValueUpdate,
        isMandatory,
        presentEmptyStack,
        ButtonVisual,
      };
    },
  });
</script>
<style lang="scss">
  .AtFormStackRepeatable {
    .repeat-stack-wrapper {
      .AtCardClickable {
        &:hover {
          background-color: var(--pri-100);
        }
        .AtButton:hover {
          background-color: transparent;
        }
        .AtButton {
          background-color: transparent;
        }
      }
    }
  }
</style>
