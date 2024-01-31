import { defineAsyncComponent } from 'vue';

import { CellRenderers, ColumnType } from './types';

export const defaultCellRenderers: CellRenderers = {
  [ColumnType.Text]: defineAsyncComponent(
    () => import(/* webpackChunkName: "TextCell" */ './cells/TextCell.vue')
  ),
  [ColumnType.Date]: defineAsyncComponent(
    () => import(/* webpackChunkName: "DateCell" */ './cells/DateCell.vue')
  ),
  [ColumnType.Number]: defineAsyncComponent(
    () => import(/* webpackChunkName: "NumericCell" */ './cells/NumericCell.vue')
  ),
  [ColumnType.FieldCheckbox]: defineAsyncComponent(
    () => import(/* webpackChunkName: "FieldCheckbox" */ './cells/FieldCheckbox.vue')
  ),
};

export default defaultCellRenderers;
