import { createApp } from 'vue';

import { createRouter, createWebHashHistory, RouteLocationNormalized } from 'vue-router';

import Injector from '@agritask/js-utils/libs/inject/Injector';

import { I18N } from '../src/js/vue/utils/getTranslators';
import { createI18nInstance } from '../src/js/vue/vue-i18n';
import App from './App.vue';
import { routes, DEFAULT_ROUTE } from './helpers/routes';

const i18n = createI18nInstance('en');
Injector.bindToConstantValue(I18N, i18n);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: '/', redirect: DEFAULT_ROUTE }, ...routes],
});

(function () {
  const logStyles = {
    ok: 'background: #454947; color: #33ff33',
    fail: 'background: #550000; color: #ff5555',
  };

  try {
    /* eslint-disable no-console */
    console.log('%c create Vue demo app ', logStyles.ok);
    const app = createApp(App);
    app.use(router);
    app.use(i18n);

    router.afterEach((_: RouteLocationNormalized, __: RouteLocationNormalized) => {
      const headerHeight = (document.getElementById('mainHeader') as HTMLElement).offsetHeight;
      if (window.pageYOffset > headerHeight) {
        window.scrollTo(0, headerHeight);
      }
    });

    app.config.performance = process.env.NODE_ENV !== 'production';
    app.mount('#demoApp');
  } catch (err) {
    /* eslint-disable no-console */
    console.log('%c error initing Vue demo app: ', logStyles.fail);
    console.error(err);
  }
})();
