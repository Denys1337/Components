export enum Appearance {
  Regular = 'regular',
  Error = 'error',
  Confirmation = 'confirmation',
  WarningConfirmation = 'warning-confirmation',
  OnlyConfirm='only-confirm'
}

export enum Size {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

const sizeValidator = (value: Size) => Object.values(Size).includes(value);

export const atPopupBaseVueProps = {
  currentSize: {
    type: String,
    default: Size.Medium,
    validator: sizeValidator,
  },
  show: { type: Boolean, required: true },
  disableClickAway: { type: Boolean, default: false },
  showCloseIcon: { type: Boolean, default: false },
  disableCloseIcon: { type: Boolean, default: false },
};

export const atPopupVueProps = {
  ...atPopupBaseVueProps,
  appearance: { type: String, default: Appearance.Regular },
  confirmText: { type: String, required: false },
  cancelText: { type: String, required: false },
  closeText: { type: String, required: false },
  titleText: { type: String, required: false },
  contentText: { type: String, required: false },
  baseTranslationPath: { type: String, required: false },
  translationPath: { type: String, required: false },
  confirmDisabled: { type: Boolean, default: false },
  buttonsDisabled: { type: Boolean, default: false },
  confirmLoading: { type: Boolean, default: false },
  showConfirmationButtons: { type: Boolean, default: false },
  disableCloseButton: { type: Boolean, default: false },
  showDividerLine: { type: Boolean, default: false },
  showFooter: { type: Boolean, default: true },
  titleSize: { type: String, default: Size.Large },
};

export const atPopupSplitViewVueProps = {
  ...atPopupVueProps,
  imageName: { type: String, required: false },
  currentSize: {
    type: String,
    default: Size.Large,
    validator: sizeValidator,
  },
};

export interface AtPopupProps extends AtPopupBaseProps, AtPopupFooterProps {
  titleText: string;
  contentText: string;
  baseTranslationPath: string;
  translationPath: string;
  buttonsDisabled: boolean;
}

export interface AtPopupSplitViewProps extends AtPopupFooterProps {
  show: boolean;
  imageName: string;
  currentSize: string;
}

export interface AtPopupFooterProps {
  appearance: Appearance;
  confirmText?: string;
  cancelText?: string;
  closeText?: string;
  confirmDisabled: boolean;
  confirmLoading: boolean;
  showConfirmationButtons: boolean;
  disableCloseButton: boolean;
  showDividerLine: boolean;
}

export interface AtPopupBaseProps {
  currentSize: Size;
  show: boolean;
  showCloseIcon: boolean;
  disableClickAway: boolean;
  showDividerLine: boolean;
}

export interface AtPopupTitleProps {
  titleSize: Size;
  appearance: Appearance;
  baseTranslationPath: string;
  translationPath: string;
  titleText: string;
  showDividerLine: boolean;
}

export type ShowAtPopupFunction = (
  popupAppearance: Appearance,
  translationPath: string,
  confirmCallback?: () => void,
  closeCallback?: () => void,
  titleText?: string,
  contentText?: string,
  confirmText?: string,
  cancelText?: string,
  closeText?: string
) => void;

export interface AtPopupHookProps {
  show: boolean;
  confirmCallback?: () => void;
  closeCallback?: () => void;
  appearance: Appearance;
  translationPath: string;
  titleText?: string;
  contentText?: string;
  confirmText?: string;
  cancelText?: string;
  closeText?: string;
  additionalProps?: Partial<AtPopupProps>;
}
