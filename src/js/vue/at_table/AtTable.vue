<template>
  <table
    ref="tableRef"
    class="AtTable"
    :id="tableId"
    :class="{ 'loading-or-empty': isLoading || !filteredData.length }"
    :style="cssVars"
  >
    <thead ref="tableHeadRef" class="AtTable-head">
      <tr
        class="table-head-row table-row font-tag AtTable-head-row"
        :class="{ 'has-subcolumns': subcolumns.length }"
      >
        <template v-for="column in tableColumns">
          <TableHeadCellCheckbox
            v-if="column.type === ColumnType.FieldCheckbox"
            class="AtTable-head-row-cell"
            :key="`TableHeadCellCheckbox-${column.name}`"
            rowspan="2"
            :column="column"
            :disabled="!filteredData.length || isLoading"
            :is-all-selected="isAllRowsSelected"
            :is-indeterminate="isSomeRowSelected && !isAllRowsSelected"
            @input="handleAllSelection($event)"
          />
          <TableHeadCell
            v-else
            class="AtTable-head-row-cell"
            :key="`TableHeadCell-${column.name}`"
            :column="column"
            :sorting="sorting"
            @sort="handleSort(column)"
            @show-tooltip="showTooltip"
            @resized="handleHeadCellResize(column.name, $event)"
          >
            <template #[`table-head-cell-title-${column.name}`]>
              <slot :name="`table-head-cell-title-${column.name}`"></slot>
            </template>
          </TableHeadCell>
        </template>
      </tr>
      <tr v-if="subcolumns.length" class="AtTable-head-row has-subcolumns">
        <TableHeadCell
          v-for="subColumn in subcolumns"
          class="AtTable-head-row-cell"
          :key="subColumn.name"
          :column="subColumn"
          :sorting="sorting"
          @sort="handleSort(column)"
          @show-tooltip="showTooltip"
        >
          <template #[`table-head-cell-title-${subColumn.name}`]>
            <slot :name="`table-head-cell-title-${subColumn.name}`"></slot>
          </template>
        </TableHeadCell>
      </tr>
    </thead>
    <tbody
      class="AtTable-body font-body-small"
      :class="{
        'at-table-body-empty-state': !filteredData.length,
        'at-table-body-loading': isLoading,
      }"
    >
      <TractorLoader v-if="isLoading" />
      <EmptyStateMessage
        v-else-if="!filteredData.length"
        class="empty-state-message"
        @click="$emit('add-item-click', $event)"
        :title-i18n="emptyStateTitle"
        :description-i18n="emptyStateDescription"
        :show-action-button="showEmptyStateButton"
        :action-text-i18n="emptyStateButtonText"
        :button-tag="emptyStateButtonTag"
        :button-href="emptyStateButtonHref"
        img-width="160px"
      >
        <template #image-logo v-if="emptyStateImage">
          <img :src="emptyStateImage" :alt="$t(emptyStateImageAltAttribute)" />
        </template>
      </EmptyStateMessage>
      <tr
        v-for="(row, rowIndex) in filteredData"
        class="AtTable-body-row"
        @contextmenu="$emit('open-context-menu', $event, row, handleSingleSelection)"
        @click="$emit('row-click', $event, row, handleSingleSelection)"
        :key="`${tableId}-row-${rowIndex}`"
        :class="{ selected: rowSelectionModel[row[rowIdProperty]], loading: isLoading }"
      >
        <td
          v-for="(column, columnIndex) in flattenColumns"
          class="AtTable-body-row-cell"
          :class="column.name"
          :key="`Component-${tableId}-cell-${rowIndex}-${columnIndex}`"
          @click="$emit('cell-click', $event, column, row)"
        >
          <Component
            :is="renderCellContent(row, column)"
            :model-value="getCellValue(row, column)"
            :column="column"
            :row-index="rowIndex"
            :row-id="row.id"
            :column-index="columnIndex"
            v-on="cellEventHandlers(row, column)"
            v-if="getCellValue(row, column) !== undefined"
            :style="cellCustomStyles[column.name]"
            :max-width="cellCustomStyles[column.name]?.maxWidth"
          />
        </td>
      </tr>

      <Tooltip direction="top" :reference="tooltipReference" v-if="tooltipReference">
        {{ tooltipValue }}
      </Tooltip>
    </tbody>
  </table>
</template>

<script lang="ts">
  import { computed, defineComponent, defineAsyncComponent, onUpdated, ref, watch } from 'vue';

  import { stringIncludesQueryInsensitive } from '@agritask/js-utils/libs/string_utils';

  import { getTranslators } from '../../../utils';
  import defaultCellRenderers from './cellRenderers';
  import TableHeadCell from './components/TableHeadCell.vue';
  import {
    CellRenderer,
    Column,
    ColumnType,
    Row,
    RowSelection,
    AtTableVueProps,
    ROW_CHECKBOX_COLUMN,
    SortingDirection,
    MIN_CELL_WIDTH,
    CellRenderers,
  } from './types';
  import { getColumnType } from './utils';

  const TractorLoader = defineAsyncComponent(
    () =>
      import(/* webpackChunkName: "TractorLoader" */ '../loaders/tractor_loader/TractorLoader.vue')
  );
  const Tooltip = defineAsyncComponent(
    () => import(/* webpackChunkName: "Tooltip" */ '../tooltip/Tooltip.vue')
  );
  const TableHeadCellCheckbox = defineAsyncComponent(
    () =>
      import(
        /* webpackChunkName: "TableHeadCellCheckbox" */ './components/TableHeadCellCheckbox.vue'
      )
  );
  const EmptyStateMessage = defineAsyncComponent(
    () =>
      import(
        /* webpackChunkName: "EmptyStateMessage" */
        '../empty_state_message/EmptyStateMessage.vue'
      )
  );

  export default defineComponent({
    name: 'AtTable',
    components: {
      TableHeadCell,
      TableHeadCellCheckbox,
      Tooltip,
      EmptyStateMessage,
      TractorLoader,
    },
    props: AtTableVueProps,
    emits: [
      'apply-sorting',
      'update:rowSelection',
      'data-change',
      'open-context-menu',
      'row-click',
      'add-item-click',
      'cell-click',
      'reload-data',
    ],
    setup(props, { emit }) {
      //Adds a checkbox field to the table
      const tableColumns = computed(() =>
        props.rowSelection ? [ROW_CHECKBOX_COLUMN, ...props.columns] : props.columns
      );
      const tableRef = ref<HTMLElement>();
      const tableHeadRef = ref<HTMLElement>();
      const topOffset = ref<string>('0px');

      const cssVars = computed(() => {
        return {
          '--max-table-height': props.maxHeight,
          '--table-background': props.parentBackground,
          '--top-offset': topOffset.value,
          '--table-head-height': `${tableHeadRef.value?.clientHeight || 0}px`,
        };
      });

      onUpdated(() => {
        if (props.fitInPage && tableRef.value) {
          topOffset.value = `${tableRef.value.offsetTop + 32}px`; // 32px margin from bottom
        }
      });

      const tooltipReference = ref<string | null>(null);
      const tooltipValue = ref<string>('');
      const flattenColumns = computed((): Column[] =>
        tableColumns.value.reduce((accumulator: Column[], column) => {
          if (!column.subcolumns?.length) {
            return [...accumulator, column];
          }
          const subColumnsToColumns: Column[] = column.subcolumns.reduce(
            (subColumnsAccumulator: Column[], subColumn: Column) => [
              ...subColumnsAccumulator,
              {
                ...subColumn,
                parentColumnName: column.name,
              },
            ],
            []
          );
          return [...accumulator, ...subColumnsToColumns];
        }, [])
      );

      const isAllRowsSelected = computed(
        () =>
          !!filteredData.value.length &&
          filteredData.value.every((row) => rowSelectionModel.value[row[props.rowIdProperty]])
      );

      watch(
        () => props.isLoading,
        (loading: boolean) => {
          if (loading && tableRef.value) {
            tableRef.value.scrollTo(0, 0);
          }
        }
      );

      const subcolumns = computed(() => {
        const subcolumns: Column[] = [];
        tableColumns.value.forEach((column) => {
          if (column.subcolumns?.length) {
            subcolumns.push(...column.subcolumns);
          }
        });
        return subcolumns;
      });

      const sorting = ref<Record<string, SortingDirection>>(props.initialSorting);

      const { t } = getTranslators();

      const allCellRenderers = computed<CellRenderers>(() => ({
        ...defaultCellRenderers,
        boolean: (value: boolean) => (value ? t('yes') : t('no')),
        ...props.cellRenderers,
      }));

      const noRenderer: { [key: string]: boolean } = {};
      const findRenderer = (row: Row, column: Column): CellRenderer => {
        const columnType = getColumnType(column);
        if (Object.keys(props.cellDataBasedColumnRenderers).includes(columnType)) {
          const renderer = props.cellDataBasedColumnRenderers[columnType];
          if (renderer) {
            return renderer(getCellValue(row, column));
          }
        } else {
          const renderer = allCellRenderers.value[columnType];
          if (renderer) {
            return renderer;
          }
        }

        //Avoiding warning twice about same columnType
        if (!noRenderer[columnType]) {
          console.warn('There is no renderer for column type: ', columnType);
          noRenderer[columnType] = true;
        }
        return allCellRenderers.value[ColumnType.Fallback]!;
      };

      const renderCellContent = (row: Row, column: Column) => {
        const renderer = findRenderer(row, column);
        return renderer;
      };

      const handleSort = (column: Column) => {
        if (!sorting.value[column.name] || sorting.value[column.name] === 'desc') {
          sorting.value = { [column.name]: 'asc' };
        } else if (sorting.value[column.name] === 'asc') {
          sorting.value = { [column.name]: 'desc' };
        }
        emit('apply-sorting', sorting.value);
      };

      const handleValueChange = (newValue: any, rowId: string | number, propertyName: string) => {
        const newData = props.data.map((row) => {
          if (row[props.rowIdProperty] === rowId) {
            return {
              ...row,
              [propertyName]: newValue,
            };
          }
          return row;
        });
        emit('data-change', newData);
      };

      const filteredData = computed(() => {
        if (!props.filter || Object.values(props.filter).every((filter) => filter === '')) {
          return props.data;
        }
        return props.data.filter((row: Row) => {
          for (const key in row) {
            if (
              row[key] !== undefined &&
              key in props.filter! &&
              stringIncludesQueryInsensitive(row[key], String(props.filter![key]))
            ) {
              return true;
            }
          }
          return false;
        });
      });

      const getCellValue = (row: Row, column: Column) => {
        if (column.name === 'rowSelection') {
          return rowSelectionModel.value[row[props.rowIdProperty]] !== undefined;
        } else if (column.parentColumnName) {
          return row[column.parentColumnName][column.name];
        } else {
          return row[column.name];
        }
      };

      const rowSelectionModel = computed<RowSelection>({
        get: () => props.rowSelection || {},
        set: (newValue: RowSelection) => {
          emit('update:rowSelection', newValue);
        },
      });

      const isSomeRowSelected = computed<boolean>(() => {
        // Checks if there is any key in the object
        for (let _ in props.rowSelection) {
          return true;
        }
        return false;
      });

      const handleSingleSelection = (selectRow: boolean, row: Row) => {
        const id = row[props.rowIdProperty];
        if (selectRow) {
          rowSelectionModel.value[id] = row;
        } else {
          try {
            delete rowSelectionModel.value[id];
          } catch (e) {
            console.error(e);
          }
        }
      };

      const handleAllSelection = (selectAll: boolean) => {
        if (selectAll) {
          filteredData.value.forEach(
            (row) => (rowSelectionModel.value[row[props.rowIdProperty]] = row)
          );
        } else {
          filteredData.value.forEach(
            (row) => delete rowSelectionModel.value[row[props.rowIdProperty]]
          );
        }
      };

      const showTooltip = (data: { id: string; message: string }) => {
        tooltipReference.value = '#' + data.id;
        tooltipValue.value = data.message;
      };

      const cellEventHandlers = (row: Row, column: Column) => {
        const handlers: Record<string, Function> = {
          'update:modelValue': (event: any) =>
            handleValueChange(event, row[props.rowIdProperty], column.name),
          'show-tooltip': showTooltip,
          'reload-data': (rowSelection?: RowSelection) => emit('reload-data', rowSelection),
        };
        if (column.type === ColumnType.FieldCheckbox) {
          handlers['select-toggle'] = (event: boolean) => handleSingleSelection(event, row);
        }
        return handlers;
      };

      const cellCustomStyles = ref<Record<string, object>>({});

      const handleHeadCellResize = (name: string, maxWidth: string) => {
        if (Number(maxWidth.replace('px', '')) < MIN_CELL_WIDTH) {
          return;
        }

        cellCustomStyles.value[name] = {
          maxWidth,
        };
      };

      return {
        showTooltip,
        rowSelectionModel,
        isAllRowsSelected,
        tableRef,
        cssVars,
        isSomeRowSelected,
        tableColumns,
        flattenColumns,
        findRenderer,
        renderCellContent,
        cellEventHandlers,
        handleSort,
        sorting,
        subcolumns,
        filteredData,
        handleSingleSelection,
        handleAllSelection,
        getCellValue,
        ColumnType,
        tooltipReference,
        tooltipValue,
        tableHeadRef,
        handleHeadCellResize,
        cellCustomStyles,
      };
    },
  });
</script>

<style lang="scss">
  @import './cells/cells.scss';
  @import './at-table.scss';
</style>
