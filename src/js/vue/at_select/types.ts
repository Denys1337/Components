import { PropType } from 'vue';

import { ButtonSize } from '../at_button/types';
import { MIN_OPTIONS_FOR_FILTERING_DEFAULT } from './hooks/useFiltering';

export const SHOWN_SELECTIONS_LIMIT = 5;

export type valueType = string | string[] | number | number[];

export interface BaseOption {
  value?: any;
  text?: string;
}

export interface Option extends BaseOption {
  translate?: boolean;

  [key: string]: any;
}

export interface OptionGroup {
  title: string;
  options: Option[];
}

export type OptsOrGroups = Option[] | OptionGroup[];
export enum Status {
  Loading = 'loading',
  Error = 'error',
  // Auto status means that the request was successful, and we might have options or not
  Auto = 'auto',
}

export interface AtSelectProps {
  name: string;
  label: string;
  visual: AtSelectVisual;
  useInlineLabel?: boolean;
  modelValue: valueType;
  options: OptsOrGroups;
  valueField: string;
  textField: string;
  keyField: string;
  multiple: boolean;
  filter: boolean;
  required: boolean;
  inputCols: number;
  wideLayout: boolean;
  disabled: boolean;
  status: Status;
  invertDropdownXAlignment: boolean;
  readonly: boolean;
  passiveRequired: boolean;
  invalid: boolean;
  labelClasses: object;
  disableDefaultFilter?: boolean;
  enableLazyLoad?: boolean;
  storedOptions: StoreOptions;
  errorMessage?: string;
  emptyResponseMessage?: string;
  minOptionsForFiltering?: number;
  loadingNextOptions?: boolean;
  maxShownSelections: number;
  enableAddOptionWhenOptionsEmpty: boolean;
  size: ButtonSize;
  showSelectionsAsPills: boolean;
  maxLabelLength?: number;
  showLabelWithSelected?: boolean;
  searchInputPlaceholder: string;
}
export interface AtSelectRequestOptionsProps extends AtSelectProps {
  requestFunction(args?: object | object[]): Promise<OptsOrGroups>;

  requestErrorHandler?(error?: unknown): void;

  optionsResponseFormatter: (arg: any[]) => any[];
  lazyLoad: boolean;
  requestParams: object | object[];
}

export enum AtSelectVisual {
  Regular = 'regular',
  Inline = 'inline',
}

export type StoreOptions = OptsOrGroups | Map<string, Option>;

export const maxLabelLengthProp = { type: Number, validator: (value: Number) => value > 0 };

export const atSelectVueProps = {
  // the style in which the AtSelect will be displayed
  visual: {
    type: String as PropType<AtSelectVisual>,
    default: AtSelectVisual.Regular,
  },
  // the field name in the context of the form
  name: { type: String, required: false },
  // label / title of the input
  label: { type: String, default: '' },
  // inline label shows up inline and doesn't go upwards
  useInlineLabel: { type: Boolean, required: false, default: undefined },
  // whether the field is required
  required: { type: Boolean, default: false },
  // whether the field is required later
  passiveRequired: { type: Boolean, default: false },
  // multiple selections
  multiple: { type: Boolean, default: false },
  // the selected value - should be array if multi select
  modelValue: { type: [Array, String, Number, Object] as PropType<valueType>, required: false },
  // array of objects as selectable options
  options: { type: Array as PropType<OptsOrGroups> },
  // the key in the option to be identified as
  valueField: { type: String, default: 'value' },
  // the key in the option to be displayed
  textField: { type: String, default: 'text' },
  // if the options are an Array of Object, this field is the key in each object that would be used as the v-for :key
  keyField: { type: String, required: false },
  // enable filtering options with text input
  filter: { type: Boolean, default: null },
  // for multi select: the number of columns (up to 12) the input part will take, ignored with using wideLayout
  inputCols: { type: Number, default: 12 },
  // when true, the input is not limited to the 'input-max-width', good for multiple in wide layout. will made inputCols ignored.
  wideLayout: { type: Boolean, default: false },
  // disabling changing the values
  disabled: { type: Boolean, default: false },
  // Use to show the status of the options
  status: { type: String as PropType<Status>, default: 'auto' },
  // Instead of having the options aligned to the begining of the field, they would be aligned to the end of the field
  invertDropdownXAlignment: { type: Boolean, default: false },
  // Use when field should be editable
  readonly: { type: Boolean, default: false },
  // Used to show that field is invalid
  invalid: { type: Boolean, default: false },
  // Applies additional classes to select label
  labelClasses: { type: Object, required: false },
  // Disables the default filtering inside options list. Use it when we have server side search
  disableDefaultFilter: { type: Boolean, required: false },
  // Enables the lazy loading of options, by loading them by parts. Next part of options will be loaded and added to the last when user scroll down to the end of it.
  // Use it when we have a lot of data and we load the data by parts from the BE, use the scrolled-down event to load more options
  enableLazyLoad: { type: Boolean, required: false },
  // Enables the lazy rendering of options, by rendering them by parts. Next part of options will be rendered in the list when user scroll down to the end of it.
  // This is done automatically by the AtSelectDropdown component
  enableLazyRender: { type: Boolean, default: true },
  // Enables the search button. Use it when you want to add the possibility to server side search
  searchButtonEnabled: { type: Boolean, required: false },
  // supports multi search by comman
  searchInputPlaceholder: { type: String },
  // Options that were stored selected on back end previously
  storedOptions: {
    type: [Array, Object] as PropType<StoreOptions>,
    required: false,
  },
  // Enables the button that selects all options
  showSelectAllOptions: { type: Boolean, required: false },
  // Disables select all options button
  isSelectAllOptionsDisabled: { type: Boolean, required: false },
  // Quantity of growers that we get in the response from backend while searching
  searchedOptionsCount: { type: Number, required: false },
  // An error message that will be shown to user in case of some error corrupting
  errorMessage: { type: String, required: false },
  // A message that will be shown to the current user in case of getting an empty response from the BE
  emptyResponseMessage: { type: String, required: false },
  // the minmum count of options to enable filtering
  minOptionsForFiltering: { type: Number, default: MIN_OPTIONS_FOR_FILTERING_DEFAULT },
  // sets a loading state at the end of the option list
  loadingNextOptions: { type: Boolean, required: false },
  // sets a loading state to the select all button
  isSelectAllLoading: { type: Boolean, required: false },
  // In multiple selection - The max selections to be displayed (when selections are not expanded)
  maxShownSelections: { type: Number, default: SHOWN_SELECTIONS_LIMIT },
  // In multiple selection - show selections as pills below the field
  showSelectionsAsPills: { type: Boolean, default: true },
  // When TRUE, If there are no options a "add option" panel will be in the dropdown
  enableAddOptionWhenOptionsEmpty: { type: Boolean, default: false },
  showClearButton: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: ButtonSize.m,
    validator: (value: ButtonSize) => Object.values(ButtonSize).includes(value),
  },
  // Show the lable and the selected option as - Label (selected)
  showLabelWithSelected: {
    type: Boolean,
    default: true,
  },
  // currently filtred text for reopening of the dropdown
  queryText: { type: String, required: false },
  minDropdownWidth: { type: [Number, String], required: false, default: '224px' },
  maxDropdownWidth: { type: [Number, String], required: false },
  maxLabelLength: maxLabelLengthProp,
  customSelectAll: { type: Boolean, default: false },
};

export const DEFAULT_OPTIONS_PER_PAGE = 40;
