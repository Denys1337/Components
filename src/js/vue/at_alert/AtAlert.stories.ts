import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtAlert from './AtAlert.vue';
import { AlertTypes, AtAlertProps } from './types';

const argTypes = {
    type: {
        control: {
            type: 'select',
            options: Object.values(AlertTypes),
        },
    },
};

export default {
    title: 'Components/AtAlert',
    component: AtAlert,
    decorators: [DefaultDecorator],
    argTypes,
};

export const Default: Story<AtAlertProps> = (args: AtAlertProps) => ({
    name: 'DefaultAtAlertStory',
    components: {AtAlert},
    setup() {
        return {args};
    },
    template: `
      <div>
      <AtAlert v-bind="args"></AtAlert>
      </div>`,
});

Default.args = {
    type: AlertTypes.Info,
    title: 'Alert Title',
    content: 'alert content',
} as AtAlertProps;
