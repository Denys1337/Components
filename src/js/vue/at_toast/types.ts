import { Ref } from 'vue';

// Types
export enum ToastPosition {
  TopStart = 'top-start',
  BottomStart = 'bottom-start',
  TopEnd = 'top-end',
  BottomEnd = 'bottom-end',
  TopCenter = 'top-center',
  BottomCenter = 'bottom-center',
}
export enum AtToastType {
  Info = 'info',
  Error = 'error',
  Success = 'success',
}

export type ToastsLists = {
  -readonly [key in ToastPosition]: {
    initialized: Ref<boolean>;
    cards: Ref<AtToastOptionsWithId[]>;
  };
};

export interface AtToastOptions {
  title: string;
  position?: ToastPosition;
  type?: AtToastType;
  message?: string;
  duration?: number;
  isCloseDisabled?: boolean;
}
export interface AtToastPluginOptions {
  // Inset of the toasts from the top
  topInset: String;
  // Inset of the toasts from the bottom
  bottomInset: String;
  // Inset of the toasts from right/left
  inlineInset: String;
}

export type AtToastOptionsWithId = AtToastOptions & { id: string };

export interface AtToastCardProps {
  id: string;
  title: string;
  type: AtToastType;
  message?: string;
  isCloseDisabled?: boolean;
}
export interface AtToastListProps {
  position: ToastPosition;
  toasts: Ref<AtToastOptionsWithId[]>;
  toastListStyles: AtToastPluginOptions;
}
export type AtToastCreate = (options: AtToastOptions) => string;

export interface AtToast {
  // Creates a toast and shows it
  create: AtToastCreate;
  // Closes a toast by id
  close: (id: string) => void;
  // Clears the toast from screen
  clear: () => void;
}

import { InfoCircleIcon, AlertCircleIcon, CircleCheckIcon } from 'vue-tabler-icons';

export const ToastIcons = {
  [AtToastType.Info]: {
    props: { stroke: 'var(--pri-100)', fill: 'var(--pri-500)' },
    icon: InfoCircleIcon,
  },
  [AtToastType.Error]: {
    props: { stroke: 'var(--red-100)', fill: 'var(--red-500)' },
    icon: AlertCircleIcon,
  },
  [AtToastType.Success]: {
    props: { stroke: 'var(--green-100)', fill: 'var(--green-500)' },
    icon: CircleCheckIcon,
  },
};

//
// Vue Prototype Toast Injections
//
declare module '@vue/runtime-core/dist/runtime-core' {
  interface ComponentCustomProperties {
    readonly $atToast: AtToast;
  }
}

// Defaults
export const DEFAULT_STAY_DURATION = 5000;
export const DEFAULT_POSITION = ToastPosition.BottomCenter;
export const DEFAULT_TOAST_TYPE = AtToastType.Info;
