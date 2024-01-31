<template>
  <SelectorGroup
    :name="id"
    v-model="model"
    size="large"
    orientation="row"
    :options="options"
    :disabled="questionButtonsDisabled"
  />
</template>
<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue';

  import SelectorGroup from '../../../../../selector_group/SelectorGroup.vue';
  import { SelectorItem } from '../../../../../selector_group/types';
  import { AtFormQuestionProps } from '../../../../types';
  import { AtQuestionStatus } from '../../../types';
  export default defineComponent({
    name: 'AtFormBooleanQuestion',
    components: {
      SelectorGroup,
    },
    props: {
      ...AtFormQuestionProps,
      modelValue: {
        type: String,
        validator: (v: string) => ['true', 'false', ''].includes(v),
        default: '',
      },
      status: {
        type: String as PropType<AtQuestionStatus>,
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const model = computed<string>({
        get: () => props.modelValue,
        set: (value) => {
          emit('update:modelValue', value);
        },
      });

      const options: SelectorItem[] = [
        { text: 'Yes', value: 'true', translate: false },
        { text: 'No', value: 'false', translate: false },
      ];

      return {
        model,
        options,
        props,
      };
    },
  });
</script>
<style lang="scss"></style>
