<template>
  <AtInput
    class="AtFormBuilderShortText"
    disabled
    :placeholder="$t('form_builder.short_text_placeholder')"
    :maxlength="256"
  />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import AtInput from '../../../../at_input/AtInput.vue';
  import { AtFormBuilderQuestionProps } from '../../../types';

  export default defineComponent({
    name: 'AtFormBuilderShortText',
    components: { AtInput },
    props: AtFormBuilderQuestionProps,
  });
</script>
