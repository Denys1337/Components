<template>
  <th class="TableHeadCellCheckbox table-head-cell font-body-small">
    <AtCheckbox
      :model-value="isAllSelected"
      :indeterminate="isIndeterminate"
      :disabled="disabled"
      @update:modelValue="$emit('input', $event)"
    />
  </th>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import AtCheckbox from '../../at_checkbox/AtCheckbox.vue';

  export default defineComponent({
    name: 'TableHeadCellCheckbox',
    components: { AtCheckbox },
    props: {
      isIndeterminate: { type: Boolean, required: true },
      isAllSelected: { type: Boolean, required: true },
      disabled: { type: Boolean, default: false },
    },
    emits: ['input'],
    setup() {
      return {};
    },
  });
</script>

<style lang="scss">
  .TableHeadCellCheckbox .AtCheckbox {
    margin-inline-end: 0;
    margin-block-end: 0;
    .at-checkbox {
      margin: 0;
    }
  }
</style>
