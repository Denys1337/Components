<template>
  <div class="AtFormQuestionButtons block-start-07 d-flex flex-column">
    <div class="d-flex jc-space-between jc-center">
      <Selector
        class="inline-end-04"
        :disabled="disabled"
        name="AtFormQuestionButtonsFail"
        :mood="SelectorMood.Danger"
        :label="$t('certifications.execution.decline_button_text')"
        @click="handleClick(AtQuestionStatus.Failed)"
        :selected="isSelected(AtQuestionStatus.Failed)"
      >
        <XIcon />
      </Selector>
      <Selector
        :disabled="disabled"
        :mood="SelectorMood.Success"
        name="AtFormQuestionButtonsPassed"
        @click="handleClick(AtQuestionStatus.Passed)"
        :label="$t('certifications.execution.approve_button_text')"
        :selected="isSelected(AtQuestionStatus.Passed)"
      >
        <CheckIcon />
      </Selector>
    </div>

    <Selector
      class="block-start-04 as-center"
      name="AtFormQuestionButtonsPending"
      :mood="SelectorMood.Secondary"
      @click="handleClick(AtQuestionStatus.Pending)"
      :label="$t('certifications.execution.pending_button_text')"
      :selected="isSelected(AtQuestionStatus.Pending)"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import { CheckIcon, XIcon } from 'vue-tabler-icons';

  import Selector from '../../../../../selector/Selector.vue';
  import { SelectorMood } from '../../../../../selector/types';
  import { AtQuestionStatus } from '../../../types';

  export default defineComponent({
    name: 'AtFormQuestionReviewButtons',
    components: {
      Selector,
      XIcon,
      CheckIcon,
    },
    props: {
      disabled: { type: Boolean },
      currentStatus: {
        type: String as PropType<AtQuestionStatus>,
      },
    },
    emits: ['status-change'],
    setup(props, { emit }) {
      const isSelected = (status: AtQuestionStatus): boolean => {
        if (!props.currentStatus && status !== AtQuestionStatus.Pending) {
          return true;
        }

        return status === props.currentStatus;
      };

      const handleClick = (status: AtQuestionStatus) => {
        emit('status-change', status);
      };

      return { handleClick, SelectorMood, AtQuestionStatus, isSelected };
    },
  });
</script>

<style scoped></style>
