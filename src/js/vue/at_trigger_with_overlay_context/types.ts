import { ElemVueString } from '../utils/getElement';

export interface AtTriggerWithOverlayContextProps {
  minOverlayWidth: string;
  maxOverlayWidth: string;
  customOverlayClass: string;
  overlayAlign: string;
  overlayPosition: string;
  disabled: boolean;
  showOverlay: boolean;
  fitTriggerWidth?: boolean;
  fitOverlayWidth?: ElemVueString;
}
