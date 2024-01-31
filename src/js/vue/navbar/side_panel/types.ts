import { MenuItem } from '../types';

export interface SidePanelProps {
  sections: Section[];
}

export interface Section {
  title?: string;
  menuItems: MenuItem[];
}
