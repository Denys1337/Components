import Injector from '@agritask/js-utils/libs/inject/Injector';

import { createI18nInstance } from '../../src/js/vue/vue-i18n';

export class MockInjector extends Injector {
  static readonly i18n = createI18nInstance('en');

  static init() {
    Injector.unbindAll();
    Injector.bindToConstantValue(Symbol.for('il18n'), MockInjector.i18n);
  }
}
