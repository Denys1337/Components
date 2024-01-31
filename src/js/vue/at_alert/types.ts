import {
  InfoCircleIcon,
  CircleCheckIcon,
  AlertCircleIcon,
  TablerIconComponent,
  AlertOctagonIcon,
} from 'vue-tabler-icons';

export enum AlertTypes {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

interface IconOptions {
  icon: TablerIconComponent;
  props: Object;
}

type AlertIconsMapType = { [key: string]: IconOptions };

export const AlertIconsMap: AlertIconsMapType = {
  [AlertTypes.Info]: {
    icon: InfoCircleIcon,
    props: { stroke: 'var(--pri-100)', fill: 'var(--pri-500)' },
  },
  [AlertTypes.Error]: {
    icon: AlertCircleIcon,
    props: { stroke: 'var(--red-100)', fill: 'var(--red-500)' },
  },
  [AlertTypes.Warning]: {
    icon: AlertOctagonIcon,
    props: { stroke: 'var(--orange-100)', fill: 'var(--orange-500)' },
  },
  [AlertTypes.Success]: {
    icon: CircleCheckIcon,
    props: { stroke: 'var(--green-100)', fill: 'var(--green-500)' },
  },
};
export interface AtAlertProps {
  type: AlertTypes;
  title: string;
  content: string;
  icon: string;
}
