<template>
  <AtCheckbox class="FieldCheckbox" v-model="model" />
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import AtCheckbox from '../../at_checkbox/AtCheckbox.vue';
  import { Column } from '../types';

  export default defineComponent({
    name: 'FieldCheckbox',
    components: { AtCheckbox },
    props: {
      modelValue: { type: Boolean, required: true },
      column: { type: Object as PropType<Column>, required: false },
    },
    emits: ['select-toggle', 'update:modelValue'],
    setup(props, { emit }) {
      const model = computed({
        get: () => props.modelValue,
        set: (newValue) => {
          const rowSelection = computed(() => props.column?.name === 'rowSelection');
          emit(rowSelection.value ? 'select-toggle' : 'update:modelValue', newValue);
        },
      });

      return { model };
    },
  });
</script>

<style lang="scss">
  .FieldCheckbox.AtCheckbox {
    margin-inline-end: 0;
    margin-block-end: 0;
    .at-checkbox {
      margin: 0;
    }
  }
</style>
