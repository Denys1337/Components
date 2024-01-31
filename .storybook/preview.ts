import 'reflect-metadata';
import './style.scss';
import './build/css/agritask-font.css';
import '@storybook/addon-console';
import { app } from '@storybook/vue3';

import { AtToast } from '../src/js/vue/at_toast/AtToastPlugin';
import { AtToastPluginOptions } from '../src/js/vue/at_toast/types';
import { tooltip } from '../src/js/vue/directives/tooltip';
import { createI18nInstance } from '../src/js/vue/vue-i18n';

const i18n = createI18nInstance('en');

app.use(AtToast, {
  topInset: 'var(--spacing-08)',
  bottomInset: 'var(--spacing-08)',
  inlineInset: 'var(--spacing-08)',
} as AtToastPluginOptions);

app.use(i18n);

/** registering directives  */
app.directive('tooltip', tooltip);

export const parameters = {
  viewMode: 'docs',
};
