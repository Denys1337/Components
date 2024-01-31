import colors from '../../../../../style/scss/_colors.scss';
import { BadgeTypes } from '../../../at_badge/types';

export interface BadgeCellProps {
  modelValue: Badge;
}

export interface Badge {
  iconName?: string;
  value?: string;
  label?: string;
  badgeType?: BadgeTypes;
  color?: string;
  backgroundColor?: string;
  hint?: string;
}

export interface AttentionCellProps {
  modelValue: AttentionRequired;
}
export interface AttentionRequired {
  attentionRequired: AttentionTypes;
  hint: string;
}

export enum AttentionTypes {
  No = 'NO',
  FarFuture = 'FAR_FUTURE',
  NearFuture = 'NEAR_FUTURE',
  Today = 'TODAY',
  Late = 'LATE',
}

const thresholdDataColors = [
  'data-red',
  'data-brown',
  'data-orange',
  'data-green',
  'data-light-blue',
  'data-blue',
  'data-purpel',
  'data-white',
];

export const backgroundColorByGradeColor: Record<string, string> = {};
for (const color of thresholdDataColors) {
  if (colors && colors[color]) {
    backgroundColorByGradeColor[colors[color]] = colors[color + '-bg'];
  }
}

export interface ThresholdCellValue {
  threshold: {
    gradeColor: string; // 6 character hex color
    gradeThreshold: BadgeTypes;
    value: string;
    gradeData: number;
  };
  hint?: string;
}
