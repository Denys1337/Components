export interface AtProgressBarProps {
  progress: number;
  size: ProgressBarSize;
}

export enum ProgressBarTextPosition {
  Top = 'top',
  Bottom = 'bottom',
}
export interface AtProgressBarLegendProps extends AtProgressBarProps {
  actionText: string;
  resultText: string;
  textPosition: ProgressBarTextPosition;
}

export enum ProgressBarSize {
  Small = 'progress-small',
  Big = 'progress-big',
}
