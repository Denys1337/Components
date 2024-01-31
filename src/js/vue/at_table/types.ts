import { Component, PropType } from 'vue';

import createId from '@agritask/js-utils/libs/createId';

/** We should use a function or a component wrapped by markRaw */
export type CellRenderer = Function | Promise<Component>;

export type CellRenderers = Record<ColumnType | string, CellRenderer>;

export interface AtTableProps {
  columns: Column[];
  data: Row[];
  cellRenderers: CellRenderers;
  // column in which each cell is rendered based on value
  cellDataBasedColumnRenderers: { [key in ColumnType | string]?: (value: any) => CellRenderer };
  filter?: Record<string, string | number>;
  rowIdProperty: string;
  rowSelection: RowSelection | null;
  maxHeight: string;
  parentBackground: string;
  fitInPage?: boolean;
  emptyStateImage?: string;
  emptyStateImageAltAttribute?: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
  showEmptyStateButton: boolean;
  emptyStateButtonText: string;
  emptyStateButtonHref?: string;
  isLoading: boolean;
}

export type RowSelection = { [key: string]: Row };

export const AtTableVueProps = {
  emptyStateImageAltAttribute: {
    typs: String,
    default: 'empty_state_message.alt_image',
  },
  tableId: { type: String, default: () => createId('table') },
  emptyStateTitle: { type: String, default: 'empty_state_message.title' },
  emptyStateDescription: { type: String, default: 'empty_state_message.description' },
  showEmptyStateButton: { type: Boolean, default: false },
  emptyStateButtonText: { type: String, default: 'empty_state_message.action_text' },
  emptyStateButtonHref: { type: String, required: false },
  emptyStateButtonTag: { type: String, default: 'button' },
  emptyStateImage: {
    type: String,
    required: false,
  },
  rowSelection: { type: Object as PropType<RowSelection | null>, default: null },
  columns: { type: Array as PropType<Column[]>, required: true, default: () => [] },
  cellDataBasedColumnRenderers: { type: Object, default: () => ({}) },
  data: { type: Array as PropType<Row[]>, default: () => [] },
  cellRenderers: { type: Object as PropType<CellRenderers>, default: () => ({}) },
  filter: { type: Object as PropType<Record<string, string | number>>, required: false },
  rowIdProperty: { type: String, default: 'id' },
  maxHeight: { type: String, default: '100vh' },
  parentBackground: { type: String, default: 'var(--white)' },
  fitInPage: { type: Boolean, default: false },
  isLoading: { type: Boolean, default: false },
  initialSorting: {
    type: Object as PropType<Record<string, SortingDirection>>,
    default: () => ({}),
  },
};

export interface Row {
  [columnName: string]: any;
}

export enum ColumnType {
  Data = 'DATA',
  Attention = 'Attention',
  Link = 'LINK',
  Text = 'TEXT',
  Notes = 'NOTES',
  Files = 'FILES',
  Img = 'IMG',
  Images = 'IMAGES',
  Date = 'DATE',
  Threshold = 'THRESHOLD',
  Badge = 'BADGE',
  Number = 'NUMBER',
  StyledValue = 'StyledValue',
  List = 'LIST',
  Boolean = 'BOOLEAN',
  Subcolumns = 'SUBCOLUMNS',
  SubcolumnsList = 'SUBCOLUMNSLIST',
  FieldCheckbox = 'FIELDCHECKBOX',
  FieldInput = 'FIELDINPUT',
  FieldSelect = 'FIELDSELECT',
  PlanVSExecutionWidget = 'PlanVSExecutionWidget',
  Fallback = 'TEXT',
  IconLabel = 'ICON_LABEL',
  CommaList = 'COMMA_LIST',
  Attachments = 'ATTACHMENTS',
}

export interface Column {
  title: string;
  type: ColumnType | string;
  rendererConfig?: Record<string, any>;
  subcolumns?: Column[];
  name: string;
  sortable?: boolean;
  key?: string;
  parentColumnName?: string;
  visible?: boolean;
}

export const ROW_CHECKBOX_COLUMN: Column = {
  title: '',
  type: ColumnType.FieldCheckbox,
  subcolumns: undefined,
  name: 'rowSelection',
  visible: true,
};

export interface Column {
  title: string;
  type: ColumnType | string;
  rendererConfig?: Record<string, any>;
  // number of values (list type) | number of characters (text type)
  limitation?: number;
  subcolumns?: Column[];
  name: string;
  width?: 'auto' | 'oneLine' | string;
  key?: string;
  parentColumnName?: string;
  visible?: boolean;
  resizable?: boolean;
}

export interface ColumnConfig extends Column {
  visible: boolean;
  order?: number | string;
}

// Mainly used in TableConfigPage
export interface ColumnConfigExtended extends ColumnConfig {
  default: boolean;
}
export type SortingDirection = 'asc' | 'desc';

export interface RenderedCellContent {
  html?: string | Function;
  component?: CellRenderer;
  value?: unknown;
}

export const MIN_CELL_WIDTH: number = 110;

export interface AggregatedNotesValue {
  values?: string[];
  dates?: string[];
}
