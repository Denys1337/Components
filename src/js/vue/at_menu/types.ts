import { Component } from 'vue';

import AtMenuGroup from './AtMenuGroup.vue';
import AtMenuItem from './AtMenuItem.vue';

export enum MenuItemTypes {
  Regular = 'regular',
  Critical = 'critical',
}

export interface MenuItem {
  label: string;
  name: string;
  disabled?: boolean;
  type: MenuItemTypes;
  menuItemProps?: { [key: string]: unknown };
  icon?: Component;
  groupItems?: undefined;
}

export interface MenuItemGroup {
  title: string;
  groupItems: MenuItem[];
}
export type MenuItemOrGroup = MenuItemGroup | MenuItem;
export type MenuItemList = Array<MenuItemOrGroup>;

export function getComponent(menuItem: MenuItemOrGroup) {
  return 'groupItems' in menuItem ? AtMenuGroup : AtMenuItem;
}

export interface AtMenuProps {
  menuItemList: MenuItemList;
}
export interface AtPositionedMenuProps extends AtMenuProps {
  show: boolean;
  transfrom: string;
  position: {
    x: number;
    y: number;
  };
}
