<template>
  <SelectorGroup
    class="AtFormBuilderBooleanQuestion"
    disabled
    name="booleanQuestion"
    size="large"
    orientation="row"
    :options="options"
  />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import SelectorGroup from '../../../../selector_group/SelectorGroup.vue';
  import getTranslators from '../../../../utils/getTranslators';
  import { AtFormBuilderQuestionProps } from '../../../types';

  export default defineComponent({
    name: 'AtFormBuilderBooleanQuestion',
    components: { SelectorGroup },
    props: AtFormBuilderQuestionProps,
    setup() {
      const { t } = getTranslators();

      const options = [
        { text: t('yes'), value: true, translate: false },
        { text: t('no'), value: false, translate: false },
      ];

      return { options };
    },
  });
</script>
