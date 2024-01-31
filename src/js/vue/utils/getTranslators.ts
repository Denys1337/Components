import { WritableComputedRef } from 'vue';

import Injector, { ServiceInjectionKey } from '@agritask/js-utils/libs/inject/Injector';

import { Locales } from '../at_translations/types';

type Key<T> = ServiceInjectionKey<T>;
export const I18N: Key<any> = Symbol.for('il18n');

export type tFunction = (
  str?: string,
  amount?: number,
  values?: any[] | Object,
  def?: string
) => string;
export type getTranslatorsFunction = (keyPrefix?: string) => {
  t: tFunction;
  locale: WritableComputedRef<Locales>;
};

const getTranslators: getTranslatorsFunction = (keyPrefix) => {
  keyPrefix = keyPrefix ? `${keyPrefix}.` : '';
  const i18n = Injector.get(I18N);

  return {
    locale: i18n.global.locale,
    t: (str, amount, values, def = '') =>
      str ? i18n.global.t(`${keyPrefix}${str}`, values, amount) : def,
  };
};

export default getTranslators;
