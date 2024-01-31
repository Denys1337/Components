<template>
  <AtInput
    class="AtFormBuilderNumericQuestion"
    type="number"
    disabled
    :placeholder="$t('form_builder.short_text_placeholder')"
  />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import AtInput from '../../../../at_input/AtInput.vue';
  import { AtFormBuilderQuestionProps } from '../../../types';

  export default defineComponent({
    name: 'AtFormBuilderNumericQuestion',
    components: { AtInput },
    props: AtFormBuilderQuestionProps,
  });
</script>
