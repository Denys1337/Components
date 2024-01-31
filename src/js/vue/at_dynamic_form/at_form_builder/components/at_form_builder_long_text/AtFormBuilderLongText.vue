<template>
  <AtTextarea
    class="AtFormBuilderLongText"
    disabled
    :placeholder="$t('form_builder.short_text_placeholder')"
    :maxlength="800"
  />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import AtTextarea from '../../../../at_textarea/AtTextarea.vue';
  import { AtFormBuilderQuestionProps } from '../../../types';

  export default defineComponent({
    name: 'AtFormBuilderLongText',
    components: { AtTextarea },
    props: AtFormBuilderQuestionProps,
  });
</script>
