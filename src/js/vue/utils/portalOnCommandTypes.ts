import { Position, Align } from '@agritask/js-utils/libs/aligning_utils';

import { ElemVueString } from './getElement';

export interface AppendConfig {
  position?: Position;
  align?: Align;
  offset?: number;
  width?: number | string;
  fitWidth?: ElemVueString | false;
  updateOnScreenChange?: boolean;
  updateOnNextTick?: boolean;
  reposition?: boolean;
  attachToFullscreenRoot?: boolean;
}
