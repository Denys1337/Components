import { Component } from 'vue';

interface BaseMenuItem {
  name: string;
  icon: string | Component;
  counter?: number;
  showChevron?: boolean;
  coverScreen?: boolean;
  current?: boolean;
  children?: MenuItem[];
  hideOnIconMode?: boolean;
  id?: string;
}

export interface CustomSidePanelMenuItem extends BaseMenuItem {
  customSidePanelComponent: Component;
  customSidePanelProps?: unknown;
}

export interface URLMenuItem extends BaseMenuItem {
  link: string;
}

export interface RouteMenuItem extends BaseMenuItem {
  route: {
    to: { name: string; params?: Object };
  };
}

export type MenuItem = URLMenuItem | RouteMenuItem | CustomSidePanelMenuItem;

export type CollapsableMenuItem = Omit<MenuItem, 'children'> & {
  children: MenuItem[];
};

export interface LogoData {
  clientLogoUrl?: string;
  clientIconUrl?: string;
  defaultLogoUrl: string;
  defaultIconUrl: string;
}

export interface UserInfo {
  lastName: string;
  firstName: string;
  role?: string;
}
