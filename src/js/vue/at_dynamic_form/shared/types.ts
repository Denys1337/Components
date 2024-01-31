import { InjectionKey, Ref } from 'vue';

import { Option } from '../types';

export interface UnitGroupOptionsModel {
  options: Option[];
  groupTitle: string;
}

export const UNIT_OPTIONS_INJECTION: InjectionKey<Ref<UnitGroupOptionsModel[]>> =
  Symbol.for('unit-options');
