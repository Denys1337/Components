<template>
  <tr
    class="SubcolumnsCell AtTable-body-row-cell"
    v-for="(value, cellIndex) in modelValue"
    :key="value"
  >
    <td
      @mouseover="overflowingTextHandlers[cellIndex]"
      :id="`subcolumn-${rowIndex}-${columnIndex}-${cellIndex}`"
      class="SubcolumnsCell-text-cell"
    >
      {{ value }}
    </td>
  </tr>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import { Column } from '../types';
  import { DEFAULT_CHAR_LIMITATION } from './types';

  export default defineComponent({
    name: 'SubcolumnsCell',
    components: {},
    props: {
      modelValue: { type: Array as PropType<string[]>, required: true },
      column: { type: Object as PropType<Column>, required: true },
      rowIndex: { type: Number, required: true },
      columnIndex: { type: Number, required: true },
    },
    emits: ['show-tooltip'],
    setup(props, { emit }) {
      const overflowingTextHandlers = computed(() =>
        props.modelValue.map(mappingCellContentToMouseoverHandlers)
      );

      const mappingCellContentToMouseoverHandlers = (cell: string, cellIndex: number) =>
        // If cell content is more than 30 Charcters shows a tooltip
        cell.toString().length > DEFAULT_CHAR_LIMITATION
          ? () =>
              emit('show-tooltip', {
                id: `subcolumn-${props.rowIndex}-${props.columnIndex}-${cellIndex}`,
                message: cell,
              })
          : null;
      return { overflowingTextHandlers };
    },
  });
</script>

<style lang="scss" scoped>
  .SubcolumnsCell {
    display: table-row;
    min-height: var(--spacing-10);
    &-text-cell {
      box-sizing: content-box;
      min-height: var(--spacing-05);
      display: inline-block;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 30ch;
      padding-block: 0 var(--spacing-01);
      padding-inline: var(--column-spacing);
    }
    &:first-child {
      .SubcolumnsCell-text-cell {
        padding-top: var(--spacing-03);
      }
    }
    &:last-child {
      .SubcolumnsCell-text-cell {
        padding-bottom: var(--spacing-03);
      }
    }
    &:last-child {
      --table-border: none;
    }
  }
</style>
