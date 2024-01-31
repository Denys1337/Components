export interface AtBadgeProps {
  type: BadgeTypes;
  badgeTypeMap: BadgeTypeMap;
  icon?: string;
  noIcon: boolean;
  label?: string;
  noLabel: boolean;
  color?: string;
  backgroundColor?: string;
  translate: boolean;
  translatorPrefix?: string;
}

export enum BadgeTypes {
  Pending = 'Pending',
  Planned = 'Planned',
  Reported = 'Reported',
  Cancelled = 'Cancelled',
  Closed = 'Closed',
  Invalid = 'Invalid',
  InProgress = 'InProgress',
  Attention = 'Attention',
  Warning = 'Warning',
  Done = 'Done',
  Completed = 'Completed',
  Custom = 'Custom',
  Late = 'Late',
  Broken = 'Broken',
  Corrupt = 'Corrupt',
  //thershold types
  High = 'HIGH',
  Medium = 'MEDIUM',
  Low = 'LOW',
  Zero = 'ZERO',
  None = 'NONE',
  // certifications
  Certified = 'Certified',
  Rejected = 'Rejected',
}

export type BadgeTypeMap = {
  [key: string]: BadgeOptions;
};

interface BadgeOptions {
  icon?: string;
  label?: string;
  color?: string;
  backgroundColor?: string;
}

const GRAY_BADGE = {
  color: 'var(--gray-1000)',
  backgroundColor: 'var(--gray-300)',
};

const CHECK_MARK_BADGE = {
  icon: 'executed',
  color: 'var(--green-500)',
  backgroundColor: 'var(--green-100)',
};

const PRIMARY_BADGE = {
  color: 'var(--pri-500)',
  backgroundColor: 'var(--pri-100)',
};

const DANGER_BADGE = {
  icon: 'exclamation-mark-circle',
  color: 'var(--red-500)',
  backgroundColor: 'var(--red-100)',
};
const ATTENTION_BADGE = {
  icon: 'exclamation-mark-circle',
  color: 'var(--orange-500)',
  backgroundColor: 'var(--orange-100)',
};

export const BADGE_TYPE_MAP: BadgeTypeMap = {
  [BadgeTypes.Attention]: {
    ...ATTENTION_BADGE,
    label: 'attention',
  },
  [BadgeTypes.Planned]: {
    ...PRIMARY_BADGE,
    icon: 'empty-circle',
    label: 'planned',
  },
  [BadgeTypes.Warning]: {
    ...DANGER_BADGE,
    label: 'warning',
  },
  [BadgeTypes.Rejected]: {
    ...DANGER_BADGE,
    label: 'rejected',
  },
  [BadgeTypes.Late]: {
    ...DANGER_BADGE,
    label: 'late',
  },
  [BadgeTypes.Done]: {
    ...CHECK_MARK_BADGE,
    label: 'done',
  },
  [BadgeTypes.Certified]: {
    ...CHECK_MARK_BADGE,
    label: 'certified',
  },
  [BadgeTypes.Reported]: {
    ...CHECK_MARK_BADGE,
    label: 'reported',
  },
  [BadgeTypes.Completed]: {
    ...CHECK_MARK_BADGE,
    label: 'completed',
  },
  [BadgeTypes.InProgress]: {
    ...PRIMARY_BADGE,
    icon: 'half-full-circle',
    label: 'in progress',
  },
  [BadgeTypes.Pending]: {
    ...GRAY_BADGE,
    icon: 'empty-circle',
    label: 'pending',
  },
  [BadgeTypes.Cancelled]: {
    ...GRAY_BADGE,
    label: 'cancelled',
  },
  [BadgeTypes.Closed]: {
    ...GRAY_BADGE,
    label: 'closed',
  },
  [BadgeTypes.Invalid]: {
    ...GRAY_BADGE,
    label: 'invalid',
  },
  [BadgeTypes.High]: {
    icon: 'threshold-high',
  },
  [BadgeTypes.Medium]: {
    icon: 'threshold-medium',
  },
  [BadgeTypes.Low]: {
    icon: 'threshold-low',
  },
  [BadgeTypes.Zero]: {
    icon: 'threshold-empty',
  },
  [BadgeTypes.Broken]: {
    ...DANGER_BADGE,
    label: 'broken',
  },
  [BadgeTypes.Corrupt]: {
    ...DANGER_BADGE,
    label: 'corrupt',
  },
};
