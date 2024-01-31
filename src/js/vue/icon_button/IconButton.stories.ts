import { storiesOf } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import IconButton from './IconButton.vue';

const base = {
  title: 'IconButton',
  components: { IconButton },
  template: `
  <div class="tw-text-center mt-3">
    <IconButton 
      :icon="icon" 
      :noBorder="noBorder" 
      :disabled="disabled" 
      :blue="blue" 
      :fontSize="fontSize">
        {{ slot }}
    </IconButton>
  </div>`,
};

const baseData = {
  icon: 'icon-general-add',
  fontSize: '1rem',
  disabled: false,
  noBorder: false,
  blue: false,
  slot: 'Add',
};

const iconWithText = {
  ...base,
  data() {
    return {
      ...baseData,
    };
  },
};

const disabled = {
  ...base,
  data() {
    return {
      ...baseData,
      disabled: true,
    };
  },
};

const onlyIcon = {
  ...base,
  data() {
    return {
      ...baseData,
      icon: 'icon-search',
      slot: '',
    };
  },
};

const noBorder = {
  ...base,
  data() {
    return {
      ...baseData,
      noBorder: true,
    };
  },
};

const noBorderBlueColor = {
  ...base,
  data() {
    return {
      ...baseData,
      blue: true,
      noBorder: true,
    };
  },
};

const onlyIconBlueColorWithDifferentFontSize = {
  ...base,
  data() {
    return {
      ...baseData,
      icon: 'icon-remove',
      noBorder: true,
      slot: '',
      blue: true,
      fontSize: '2rem',
    };
  },
};

storiesOf('Components/Old/IconButton (Old)', module)
  .addDecorator(DefaultDecorator)
  .add('Icon with text', () => iconWithText)
  .add('Disabled', () => disabled)
  .add('Only icon', () => onlyIcon)
  .add('No border', () => noBorder)
  .add('No border with blue text color', () => noBorderBlueColor)
  .add(
    'Only icon blue color with different font size',
    () => onlyIconBlueColorWithDifferentFontSize
  );
