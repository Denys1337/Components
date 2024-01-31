import { Ref, PropType } from 'vue';

import { Align, Position } from '@agritask/js-utils/libs/aligning_utils';

export interface TooltipProps {
  position?: Position;
  align?: Align;
  width?: number | string;
  updateOnScreenChange?: boolean;
  enableReposition?: boolean;
  offset: number;

  triggerWithClick: boolean;
  reference: HTMLElement | ElementReference | string;
  show: boolean | undefined;
  updateOnScroll: boolean;
  updateOnResize: boolean;
  closeOnLeave: boolean;
  tooltipPadding?: string;
  observeContent: boolean;
  text?: string;
}

export enum PositionEnum {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
  InlineStart = 'inline-start',
  InlineEnd = 'inline-end',
}

export const positionValidator = (value: Position) =>
  Object.values(PositionEnum).includes(value as PositionEnum);

export type ElementReference = Ref<undefined | Element>;

export enum Direction {
  Top = 'top',
  Bottom = 'bottom',
  Right = 'right',
  Left = 'left',
}
export enum InlineDirection {
  Start = 'inline-start',
  End = 'inline-end',
}

export type GeneralDirection = Direction | InlineDirection;

export const GeneralDirectionValidator = (value: GeneralDirection) =>
  Object.values(Direction).includes(value as Direction) ||
  Object.values(InlineDirection).includes(value as InlineDirection);

const TOOLTIP_PADDING_DEFAULT = '18px';
export const ARROW_SIZE = 10;

export const tooltipProps = {
  position: {
    type: String as PropType<Position>,
    default: 'top',
    validator: positionValidator,
  },
  align: { type: String as PropType<Align>, default: 'center' },
  width: { type: [String, Number], required: false },
  updateOnScreenChange: { type: Boolean, required: false, default: true },
  enableReposition: { type: Boolean, default: true },

  // reference is required, but since before mounting an undefined is passed, Vue logs an error
  reference: { type: [String, Object] as PropType<HTMLElement | ElementReference | string> },
  offset: { type: Number, default: ARROW_SIZE },
  triggerWithClick: { type: Boolean, default: false },
  // If value is different than undefined, it changes the component to controlled
  show: { type: Boolean, default: undefined },
  updateOnScroll: { type: Boolean, default: false },
  updateOnResize: { type: Boolean, default: false },
  closeOnLeave: { type: Boolean, default: true },
  maxHeight: { type: [String], default: 'auto' },
  tooltipPadding: { type: String, default: TOOLTIP_PADDING_DEFAULT },
  observeContent: { type: Boolean, default: false },
  text: { type: [String, Object] as PropType<Ref<string> | string>, required: false },

  delay: { type: Number, required: false },
};
