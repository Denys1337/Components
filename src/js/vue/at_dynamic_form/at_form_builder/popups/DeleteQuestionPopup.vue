<template>
  <AtPopup
    :show="show"
    disable-click-away
    show-close-icon
    :confirm-text="$t(`${prefixFormBuilder}.delete_confirm_text`)"
    :title-text="$t(`${prefixFormBuilder}.delete_question_title`)"
    :cancel-text="$t(`${prefixFormBuilder}.delete_cancel_text`)"
    :content-text="$t(`${prefixFormBuilder}.delete_question_content_popup`)"
    appearance="warning-confirmation"
    @close="$emit('cancel')"
    @ok="$emit('ok', $event)"
  />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import AtPopup from '../../../at_popup/AtPopup.vue';

  export default defineComponent({
    name: 'DeleteQuestionPopup',
    components: { AtPopup },
    props: {
      show: { type: Boolean, required: true },
      prefixFormBuilder: {
        type: String,
        required: true,
      },
    },
    emits: ['cancel', 'ok'],
  });
</script>
