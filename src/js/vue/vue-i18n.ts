import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n';

import RequireContext = __WebpackModuleApi.RequireContext;

/**
 * Collects messages from locale contexts
 *
 * @param contexts Webpack "require" context (require.context) array
 */
function collectMessages(...contexts: RequireContext[]): LocaleMessages<VueMessageType> {
  const messages: LocaleMessages<VueMessageType> = {};
  contexts.forEach((context) => {
    context.keys().forEach((key) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i);
      if (matched && matched.length > 1) {
        const locale = matched[1];
        messages[locale] = Object.assign({}, messages[locale], context(key));
      }
    });
  });
  return messages;
}

export function createI18nInstance(language: string) {
  const messages = collectMessages(require.context('@/vue/locales/', true, /\.json$/));
  // @ts-ignore
  // TODO: fix this ts error PLAT-2133
  return createI18n({ locale: language, fallbackLocale: 'en', messages, legacy: false });
}
