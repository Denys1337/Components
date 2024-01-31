<template>
  <AtPopup
    class="AtFormBuilderEditQuestionOptionsPopup"
    show-close-icon
    show-confirmation-buttons
    current-size="medium"
    :show="show"
    :title-text="$t('form_builder.edit_options')"
    :confirm-text="$t('general.save')"
    :confirm-disabled="!areAllValuesUnique"
    disable-click-away
    show-divider-line
    @ok="onSubmit"
    @close="$emit('close')"
  >
    <section name="edit-options-value"></section>
    <section
      v-for="(option, index) in localQuestion.options"
      :key="index"
      class="option-block block-start-06"
    >
      <div class="block-end-02">
        <label :for="String(index)">
          <b class="option-label inline-end-01">{{ $t('general.label') }}</b>
          <span class="option-value">“{{ optionLabel(option) }}”</span>
        </label>
      </div>
      <b class="option-label">{{ $t('general.value') }}</b>
      <AtInput
        :name="String(index)"
        v-model="option.value"
        required
        lazy
        :rules="[isUnique]"
        :disabled="!isEditingEnabled"
      />
    </section>
    <template #footer v-if="enableAdvancedEdit">
      <AtButton
        @click="isEditingEnabled = !isEditingEnabled"
        :mood="isEditingEnabled ? 'none' : 'danger'"
        size="m"
        visual="tertiary"
      >
        <template #start>
          <LockIcon v-show="!isEditingEnabled" />
          <LockOpenIcon v-show="isEditingEnabled" />
        </template>
      </AtButton>
    </template>
  </AtPopup>
</template>

<script lang="ts">
  import { defineComponent, PropType, computed, inject, ref } from 'vue';

  import { LockIcon, LockOpenIcon } from 'vue-tabler-icons';

  import { deepClone } from '@agritask/js-utils/libs/object_utils';

  import AtButton from '../../../at_button/AtButton.vue';
  import AtInput from '../../../at_input/AtInput.vue';
  import AtPopup from '../../../at_popup/AtPopup.vue';
  import { atPopupVueProps } from '../../../at_popup/types';
  import { Locales } from '../../../at_translations/types';
  import { getTranslatedText } from '../../../utils/getTranslatedText';
  import getTranslators from '../../../utils/getTranslators';
  import { Option } from '../../types';
  import { AtFormBuilderQuestion } from '../types';

  export default defineComponent({
    name: 'AtFormBuilderEditQuestionOptionsPopup',
    components: {
      AtPopup,
      AtInput,
      AtButton,
      LockIcon,
      LockOpenIcon,
    },
    model: {
      name: 'question',
      event: 'change',
    },
    props: {
      ...atPopupVueProps,
      question: { type: Object as PropType<AtFormBuilderQuestion>, required: true },
    },
    emits: ['change', 'close'],
    setup(props, { emit }) {
      const enableAdvancedEdit = inject('enableAdvancedEdit', false);
      const localQuestion = ref(deepClone(props.question));
      const isEditingEnabled = ref(false);

      const locale = inject('language', 'en') as Locales;

      const values = computed(
        () => localQuestion.value.options?.map((option) => option.value) || []
      );

      const areAllValuesUnique = computed(() => {
        const uniqueValues = new Set(values.value);
        return uniqueValues.size === values.value.length;
      });

      const onSubmit = () => {
        emit('change', localQuestion.value);
        emit('close');
      };

      const optionLabel = (option: Option) => getTranslatedText(option.label, locale);

      const { t } = getTranslators();

      const isUnique = (newValue: string) => {
        // Notice the filter function in case we'd like to change the condition
        const valueMatches = values.value.filter((value) => value === newValue);
        // We are checking if this newValue already exists in our values
        // It already exists once since it's update in the computed
        // If it shows up twice then there's already another element which is the same
        if (valueMatches.length >= 2) return t('errors.unique');
        return true;
      };

      return {
        onSubmit,
        optionLabel,
        areAllValuesUnique,
        localQuestion,
        isUnique,
        isEditingEnabled,
        enableAdvancedEdit,
      };
    },
  });
</script>

<style lang="scss">
  .option-label {
    font-weight: var(--font-weight-title-large);
    font-size: var(--font-size-body-small);
  }

  .option-value {
    font-weight: 400;
    font-size: var(--font-size-body-small);
    color: var(--gray-900);
  }

  .option-block {
    padding-inline: var(--padding-pop-up-box);
    padding-bottom: 20px;

    &:not(:last-child) {
      border-bottom: 1px solid var(--gray-400);
    }
  }
  .AtFormBuilderEditQuestionOptionsPopup {
    .popup-content {
      padding: 0px;
      margin-bottom: 0px;
    }
  }
</style>
