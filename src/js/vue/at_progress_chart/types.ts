export interface AtProgressChartOption {
  value: number;
  mood: AtProgressChartMood;
}

export interface AtProgressChartLine extends AtProgressChartOption {
  styles: Record<string, string>;
}

export enum AtProgressChartMood {
  Danger = 'danger',
  Success = 'success',
  Idle = 'idle',
}

export interface AtProgressChartProps {
  options: AtProgressChartOption[];
  totalValue: number;
}

export const MINIMUM_PERCENTAGE_TO_DISPLAY = 5;
