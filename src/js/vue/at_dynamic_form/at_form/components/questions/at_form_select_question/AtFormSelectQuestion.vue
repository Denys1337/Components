<template>
  <AtRadioGroup
    :options="optionsAligned"
    :name="id"
    v-model="model"
    direction="column"
    :disabled="questionButtonsDisabled"
  />
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import AtRadioGroup from '../../../../../at_radiogroup/AtRadiogroup.vue';
  import { AtFormQuestionProps, Option } from '../../../../types';

  export default defineComponent({
    name: 'AtFormSelectQuestion',
    components: {
      AtRadioGroup,
    },
    props: AtFormQuestionProps,
    emits: ['update:modelValue'],
    setup(props, context) {
      const model = computed<string>({
        get: () => props.modelValue,
        set: (value) => {
          context.emit('update:modelValue', value);
        },
      });

      const optionsAligned = computed(() =>
        props.options.map((option: Option) => ({
          value: option.value,
          text: option.label,
        }))
      );
      return {
        model,
        props,
        optionsAligned,
      };
    },
  });
</script>
<style lang="scss">
  .AtRadiogroup {
    .AtRadiobutton:not(:first-child) {
      margin-block-start: var(--spacing-04);
    }
  }
</style>
