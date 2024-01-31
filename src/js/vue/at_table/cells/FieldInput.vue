<template>
  <AtInput
    class="FieldInput"
    v-bind="column.rendererConfig"
    :model-value="value"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import AtInput from '../../at_input/AtInput.vue';
  import { Column } from '../types';

  export default defineComponent({
    name: 'FieldInput',
    components: { AtInput },
    props: {
      modelValue: { type: String, required: true },
      column: { type: Object as PropType<Column>, required: true },
    },
    emits: ['update:modelValue'],
    setup() {
      return {};
    },
  });
</script>

<style lang="scss" scoped></style>
