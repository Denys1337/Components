import { Column, ColumnType } from './types';

export function getColumnType(column: Column) {
  return column.parentColumnName ? ColumnType.Subcolumns : column.type;
}
