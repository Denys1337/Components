import { Component } from 'vue';

import { ButtonVisual } from '../at_button/types';
import { MenuItemList } from '../at_menu/types';

export interface AtActionBarProps {
  startActions: ActionOrFieldProps[];
  endActions: ActionOrFieldProps[];
  menuActions: MenuItemList;
  buttonsVisual: ButtonVisual;
}

export enum ActionType {
  Field = 'field',
  Button = 'button',
}

export interface ActionMenuItem {
  label: string;
  name: string;
  disabled?: boolean;
  menuItemProps?: { [key: string]: unknown };
}
export interface ButtonAction extends ActionMenuItem {
  actionType: 'button';
  actionStartIcon?: Component;
  actionSndIcon?: Component;
  active?: boolean;
  size?: string;
  iconSize?: string;
}
export interface FieldAction extends ActionMenuItem {
  actionType: 'field';
}

export type ActionOrFieldProps = ButtonAction | FieldAction;

export enum Condition {
  NoRows = 'NO_ROWS',
  SingleRow = 'SINGLE_ROW',
  MultipleRows = 'MULTIPLE_ROWS',
}
