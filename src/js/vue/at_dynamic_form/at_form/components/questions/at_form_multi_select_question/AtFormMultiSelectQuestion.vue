<template>
  <AtCheckBoxGroup
    :options="optionsAligned"
    :name="id"
    v-model="model"
    direction="column"
    :disabled="questionButtonsDisabled"
  />
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import AtCheckBoxGroup from '../../../../../at_checkbox_group/AtCheckBoxGroup.vue';
  import { AtFormQuestionProps, Option } from '../../../../types';

  export default defineComponent({
    name: 'AtFormMultiSelectQuestion',
    components: {
      AtCheckBoxGroup,
    },
    props: AtFormQuestionProps,
    emits: ['update:modelValue'],
    setup(props, context) {
      const model = computed({
        get: () => (props.modelValue ? props.modelValue.split('|') : []),
        set: (value: string[]) => {
          context.emit('update:modelValue', value.join('|'));
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
<style lang="scss" scoped></style>
