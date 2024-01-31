export interface GroupItem {
  key: string;
  value: string;
  calculatedValue: string;
  cssVars: string[];
  isCSSVar: boolean;
}

export interface Group {
  title: string;
  lines: string[];
  items: GroupItem[];
}
